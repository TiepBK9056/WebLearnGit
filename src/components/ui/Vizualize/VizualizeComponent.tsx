'use client';

import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { handleGitCommitDataCommand } from '@/components/ui/Command/GitCommitData';

// Khai báo kiểu cho mỗi commit
interface CommitNode {
  id: string;
  message: string;
  parentIds: string[];
  children: CommitNode[]; // `children` là một mảng các CommitNode
}

const VizualizeComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [commitsData, setCommitsData] = useState<CommitNode[]>([]);

  useEffect(() => {
    // Lấy dữ liệu commit từ Git
    const fetchCommitData = async () => {
      setIsLoading(true);
      const data = await handleGitCommitDataCommand(); // Gọi hàm để lấy dữ liệu
      setCommitsData(data);
      setIsLoading(false);
    };

    fetchCommitData(); // Gọi hàm fetch khi component mount
  }, []);

  useEffect(() => {
    // Vẽ cây Git bằng D3.js
    if (commitsData.length > 0) {
      const root = d3.hierarchy(buildTree(commitsData), (d: CommitNode) => d.children);
      const width = 900;
      const height = 800;
      const nodeRadius = 30; // Bán kính node
      const svg = d3.select('#gitTree')
                    .attr('width', width)
                    .attr('height', height);
  
      const treeLayout = d3.tree().size([width - 2 * nodeRadius, height - 2 * nodeRadius]);
      treeLayout(root);

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
        .style('stroke', '#ccc');
  
      // Vẽ các node (commits)
      const nodes = svg.selectAll('.node')
        .data(root.descendants())
        .enter()
        .append('g') // Sử dụng nhóm `<g>` để nhóm node và text
        .attr('class', 'node-group')
        .attr('transform', (d: any) => `translate(${d.x + nodeRadius}, ${d.y + nodeRadius})`); // Dịch vị trí cả nhóm

      nodes.append('circle')
        .attr('class', 'node')
        .attr('r', nodeRadius)
        .style('fill', '#ff5733');

      nodes.append('text') // Thêm text vào giữa node
        .attr('class', 'node-text')
        .attr('text-anchor', 'middle') // Căn giữa theo chiều ngang
        .attr('alignment-baseline', 'middle') // Căn giữa theo chiều dọc
        .text((d: any) => d.data.id) // Hiển thị ID trong node
        .style('fill', 'white')
        .style('font-size', '12px');
    }
  }, [commitsData]);

  // Hàm xây dựng cây từ dữ liệu commit
  const buildTree = (commitsData: CommitNode[]): CommitNode => {
    const nodesMap: { [key: string]: CommitNode } = {}; // Map để lưu trữ commit theo ID
    const rootNode: CommitNode = { id: 'root', message: '', parentIds: [], children: [] };

    // Tạo các commit trong nodesMap
    commitsData.forEach(commit => {
      if (!nodesMap[commit.id]) {
        nodesMap[commit.id] = { ...commit, children: [] };
      }
    });

    // Duyệt qua các commit và xây dựng cây
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
      <svg id="gitTree"></svg>
      {isLoading && <p>Loading Git tree...</p>}
    </div>
  );
};

export default VizualizeComponent;
