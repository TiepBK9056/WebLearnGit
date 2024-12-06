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
    // Lấy danh sách commit từ Git
    const commits = await git.log({ fs, dir });

    // Chuyển đổi dữ liệu commit thành cấu trúc CommitNode
    const commitData: CommitNode[] = commits.map((commit) => ({
      id: commit.oid,
      message: commit.commit.message,
      parentIds: commit.commit.parent || [],
      children: [], // Children sẽ được xử lý sau nếu cần
    }));

    return commitData; // Trả về mảng commitData
  } catch (error) {
    console.error("Error fetching git commit data: ", error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
};
