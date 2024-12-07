'use client';

import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { handleGitCommitDataCommand } from '@/components/ui/Command/GitCommitData'; // Import hàm từ file khác

// Khai báo kiểu cho mỗi commit
interface CommitNode {
  id: string;
  message: string;
  parentIds: string[];
  children: CommitNode[];
}

const VizualizeComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [commitsData, setCommitsData] = useState<CommitNode[]>([]);

  useEffect(() => {
    // Lấy dữ liệu commit từ hàm bên kia
    const fetchAllBranchCommits = async () => {
      try {
        setIsLoading(true);
        const allCommits = await handleGitCommitDataCommand(); // Gọi hàm từ file khác
        setCommitsData(allCommits); // Lưu dữ liệu commit vào state
      } catch (error) {
        console.error("Error fetching commits: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllBranchCommits();
  }, []);

  useEffect(() => {
    if (commitsData.length === 0) {
      console.log("No commits found.");
      return; // Không thực hiện vẽ nếu không có commit
    }

    // Vẽ cây Git bằng D3.js
    const root = d3.hierarchy(buildTree(commitsData), (d: CommitNode) => d.children);
    const width = 900;
    const height = 800;
    const nodeRadius = 30; // Bán kính node
    const svg = d3.select('#gitTree')
                  .attr('width', width)
                  .attr('height', height);

    const treeLayout = d3.tree().size([width - 2 * nodeRadius, height - 2 * nodeRadius]);
    treeLayout(root);

    // Định nghĩa marker cho mũi tên
    svg.append('defs').append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -3 6 6')
      .attr('refX', 6)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-3L6,0L0,3')
      .attr('fill', '#fff');

    // Vẽ các liên kết (edges)
    svg.selectAll('.link')
      .data(root.links())
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('x1', (d: any) => d.source.x + nodeRadius)
      .attr('y1', (d: any) => d.source.y + nodeRadius)
      .attr('x2', (d: any) => d.target.x + nodeRadius)
      .attr('y2', (d: any) => d.target.y + nodeRadius)
      .style('stroke', '#ccc')
      .style('stroke-width', 2)
      .attr('marker-end', 'url(#arrow)');

    // Vẽ các node (commits)
    const nodes = svg.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node-group')
      .attr('transform', (d: any) => `translate(${d.x + nodeRadius}, ${d.y + nodeRadius})`);

    nodes.append('circle')
      .attr('class', 'node')
      .attr('r', nodeRadius)
      .style('fill', '#ff5733')
      .style('stroke', '#fff')
      .style('stroke-width', '2px');

    nodes.append('text') // Thêm text vào giữa node
      .attr('class', 'node-text')
      .attr('text-anchor', 'middle') // Căn giữa theo chiều ngang
      .attr('alignment-baseline', 'middle') // Căn giữa theo chiều dọc
      .text((d: any) => `${d.data.id}: ${d.data.message}`) // Hiển thị ID + Message trong node
      .style('fill', 'white')
      .style('font-size', '12px');
  }, [commitsData]);

  // Hàm xây dựng cây từ dữ liệu commit
  const buildTree = (commitsData: CommitNode[]): CommitNode => {
    const nodesMap: { [key: string]: CommitNode } = {};
    const rootNode: CommitNode = { id: 'root', message: '', parentIds: [], children: [] };

    commitsData.forEach(commit => {
      if (!nodesMap[commit.id]) {
        nodesMap[commit.id] = { ...commit, children: [] };
      }
    });

    commitsData.forEach(commit => {
      if (commit.parentIds.length > 0) {
        commit.parentIds.forEach((parentId: string) => {
          if (nodesMap[parentId]) {
            if (!nodesMap[parentId].children.some(child => child.id === commit.id)) {
              nodesMap[parentId].children.push(nodesMap[commit.id]);
            }
          }
        });
      } else {
        rootNode.children.push(nodesMap[commit.id]);
      }
    });

    return rootNode;
  };

  return (
    <div className="rounded-lg p-4">
      {commitsData.length === 0 && !isLoading && <p>No commits available.</p>}
      {isLoading && <p>Loading Git tree...</p>}
      <svg id="gitTree"></svg>
    </div>
  );
};

export default VizualizeComponent;
