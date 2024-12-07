import * as git from 'isomorphic-git';
import BrowserFS from 'browserfs';

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
    // Lấy danh sách các nhánh
    const branches = await git.listBranches({ fs, dir });

    const allCommits: CommitNode[] = [];
    const oidToIdMap: { [key: string]: string } = {};

    let commitIndex = 1; // Dùng để gán id theo thứ tự (c1, c2,...)

    // Lấy commit từ từng nhánh
    for (const branch of branches) {
      const commits = await git.log({ fs, dir, ref: branch });

      commits.forEach((commit) => {
        // Kiểm tra nếu commit đã được xử lý
        if (!oidToIdMap[commit.oid]) {
          const newId = `c${commitIndex++}`; // Gán id mới
          oidToIdMap[commit.oid] = newId;

          allCommits.push({
            id: newId,
            message: commit.commit.message,
            parentIds: commit.commit.parent || [], // Giữ nguyên parent ban đầu (oid)
            children: [],
          });
        }
      });
    }

    // Cập nhật parentIds sang id mới
    allCommits.forEach((commit) => {
      commit.parentIds = commit.parentIds.map((oid) => oidToIdMap[oid] || oid);
    });

    return allCommits; // Trả về toàn bộ commit đã gán nhãn
  } catch (error) {
    console.error("Error fetching git commit data: ", error);
    return [];
  }
};
