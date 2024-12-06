import * as git from 'isomorphic-git';
import BrowserFS from 'browserfs';
import { Terminal } from 'xterm';

const fs = BrowserFS.BFSRequire('fs'); // FS client sử dụng BrowserFS
const dir = '/myfolder'; // Đường dẫn thư mục gốc chứa .git

interface CommitNode {
  id: string;
  message: string;
  parentIds: string[];
  children: CommitNode[];
}

export const handleGitCommitDataCommand = async (): Promise<CommitNode[]> => {
    try {
      const commits = await git.log({ fs, dir });
  
      // Tạo ánh xạ oid -> id mới (c1, c2, ...)
      const oidToIdMap: { [key: string]: string } = {};
  
      // Gán nhãn và tạo ánh xạ
      const commitData: CommitNode[] = commits.map((commit, index) => {
        const newId = `c${index + 1}`; // Gán id mới (c1, c2, ...)
        oidToIdMap[commit.oid] = newId; // Lưu ánh xạ
        return {
          id: newId,
          message: commit.commit.message,
          parentIds: commit.commit.parent || [], // Giữ nguyên oid của parent ban đầu
          children: [],
        };
      });
  
      // Cập nhật parentIds sang id mới
      commitData.forEach((commit) => {
        commit.parentIds = commit.parentIds.map((oid) => oidToIdMap[oid] || oid);
      });
  
      return commitData; // Trả về danh sách commit đã được gán nhãn
    } catch (error) {
      console.error("Error fetching git commit data: ", error);
      return [];
    }
  };