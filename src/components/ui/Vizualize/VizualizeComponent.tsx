'use client';

import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { handleGitCommitDataCommand } from '@/components/ui/Command/GitCommitData';

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
    // Sắp xếp các commit từ lớn nhất đến nhỏ nhất
    const sortedCommitsData = [...commitsData].sort((a, b) => b.id.localeCompare(a.id));

    // Vẽ cây Git bằng D3.js
    if (sortedCommitsData.length > 0) {
      const root = d3.hierarchy(buildTree(sortedCommitsData), (d: CommitNode) => d.children);
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
        .attr('viewBox', '0 -3 6 6') // Điều chỉnh viewBox để mũi tên nhỏ lại
        .attr('refX', 6)  // Đưa mũi tên vào cuối đoạn đường nối (bằng bán kính node)
        .attr('refY', 0)
        .attr('markerWidth', 6)  // Kích thước mũi tên nhỏ hơn
        .attr('markerHeight', 6) // Kích thước mũi tên nhỏ hơn
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-3L6,0L0,3')  // Tạo mũi tên nhỏ
        .attr('fill', '#fff');

      // Vẽ các liên kết (edges) và "lùi" đường nối ra ngoài viền node một chút
      const offsetX = 0; // Lùi đường nối theo chiều ngang
      const offsetY = -30; // Lùi đường nối theo chiều dọc

      svg.selectAll('.link')
        .data(root.links())
        .enter()
        .append('line')
        .attr('class', 'link')
        .attr('x1', (d: any) => d.source.x + nodeRadius + offsetX) // Điều chỉnh vị trí bắt đầu (lùi ra ngoài chút)
        .attr('y1', (d: any) => d.source.y + nodeRadius + offsetY) // Điều chỉnh vị trí bắt đầu (lùi ra ngoài chút)
        .attr('x2', (d: any) => d.target.x + nodeRadius + offsetX) // Điều chỉnh vị trí kết thúc (lùi ra ngoài chút)
        .attr('y2', (d: any) => d.target.y + nodeRadius + offsetY) // Điều chỉnh vị trí kết thúc (lùi ra ngoài chút)
        .style('stroke', '#ccc')
        .style('stroke-width', 2)
        .attr('marker-end', 'url(#arrow)');  // Thêm mũi tên vào cuối đường nối

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
        .text((d: any) => `${d.data.id}: ${d.data.message}`) // Hiển thị ID trong node
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
