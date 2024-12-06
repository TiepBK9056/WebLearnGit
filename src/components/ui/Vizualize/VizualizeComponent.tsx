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
      const svg = d3.select('#gitTree')
                    .attr('width', width)
                    .attr('height', height);
  
      const treeLayout = d3.tree().size([width, height]);
      treeLayout(root);

      // Bán kính node
      const nodeRadius = 30;

      // Vẽ các liên kết (edges)
      svg.selectAll('.link')
        .data(root.links())
        .enter()
        .append('line')
        .attr('class', 'link')
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)
        .style('stroke', '#ccc');
  
      // Vẽ các node (commits)
      svg.selectAll('.node')
        .data(root.descendants())
        .enter()
        .append('circle')
        .attr('class', 'node')
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y)
        .attr('r', nodeRadius)
        .style('fill', '#ff5733');
  
      // Thêm nhãn cho các node (commit message hoặc ID)
      svg.selectAll('.text')
        .data(root.descendants())
        .enter()
        .append('text')
        .attr('class', 'text')
        .attr('x', (d: any) => d.x - nodeRadius)
        .attr('y', (d: any) => d.y + 5)
        .text((d: any) => d.data.id + ': ' + d.data.message)
        .style('fill', 'white');
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
