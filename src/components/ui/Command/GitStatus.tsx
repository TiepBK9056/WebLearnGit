import * as git from 'isomorphic-git';
import BrowserFS from 'browserfs';
import { Terminal } from 'xterm';

const fs = BrowserFS.BFSRequire('fs'); // FS client sử dụng BrowserFS
const dir = '/myfolder'; // Đường dẫn thư mục gốc chứa .git

// Hàm xử lý lệnh git status
export const handleGitStatusCommand = async (term: Terminal) => {
  try {
    // Lấy trạng thái của tất cả các tệp trong thư mục, loại trừ thư mục .git
    const statusMatrix = await git.statusMatrix({
      fs,
      dir,
      filter: (filepath) => !filepath.startsWith('.git') // Loại trừ các tệp trong .git
    });

    // Xử lý và hiển thị kết quả trạng thái tệp
    const fileStatus = statusMatrix.map(row => {
      const [filename, headStatus, workdirStatus, stageStatus] = row;
      return {
        filename,
        statusText: getStatusText(headStatus, workdirStatus, stageStatus)
      };
    });

    // Hiển thị trạng thái trên terminal
    term.writeln('Git Status:');
    fileStatus.forEach(file => {
      term.writeln(`${file.filename}: ${file.statusText}\r`);
    });
    term.write("$ ");
  } catch (error) {
    console.error("Error fetching git status: ", error);
    term.writeln('Error: Unable to fetch git status.');
  }
};

// Hàm để chuyển đổi trạng thái thành chuỗi mô tả
const getStatusText = (headStatus: number, workdirStatus: number, stageStatus: number) => {
  const statusMap: { [key: string]: string } = {
    '0,0,0': 'Untracked',
    '0,2,0': 'Untracked (not staged)',
    '0,2,2': 'Added (staged)',
    '1,1,1': 'Unmodified',
    '1,2,1': 'Modified (unstaged)',
    '1,2,2': 'Modified (staged)',
    '1,2,3': 'Modified (unstaged + staged)',
    '1,0,1': 'Deleted (unstaged)',
    '1,0,0': 'Deleted (staged)',
    '0,0,3': 'Added (force)',
  };

  return statusMap[`${headStatus},${workdirStatus},${stageStatus}`] || 'Unknown Status';
};
