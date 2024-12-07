import * as git from 'isomorphic-git';
import BrowserFS from 'browserfs';
import { Terminal } from 'xterm';

const fs = BrowserFS.BFSRequire('fs'); // FS client sử dụng BrowserFS
const dir = '/myfolder'; // Đường dẫn thư mục gốc chứa .git

// Hàm xử lý lệnh git branch
export const handleGitBranchCommand = async (command: string, term: Terminal) => {
  try {
    // Tách lệnh và đối số (nếu có)
    const args = command.trim().split(/\s+/);
    
    if (args.length === 2) {
      // Nếu chỉ có "git branch", liệt kê tất cả các nhánh

      const branches = await git.listBranches({ fs, dir });
      const currentBranch = await git.currentBranch({ fs, dir });

      term.writeln('Git Branches:');
      if (branches.length === 1) {
        term.writeln('No branches available.');
      } else {
        branches.forEach(branch => {
          if (branch === currentBranch) {
            // Tô màu nhánh hiện tại
            term.write(`\x1b[32m* ${branch}\x1b[0m\r\n`);  // Màu xanh cho nhánh hiện tại
          } else {
            term.writeln(`  ${branch}`);
          }
        });
      }
    } else if (args.length === 3) {
      // Nếu có đối số, tạo nhánh mới
      const branchName = args[2];

      // Kiểm tra xem nhánh đã tồn tại chưa
      const branches = await git.listBranches({ fs, dir });
      if (branches.includes(branchName)) {
        term.writeln(`Error: Branch "${branchName}" already exists.`);
      } else {
        // Tạo nhánh mới
        await git.branch({ fs, dir, ref: branchName });
        term.writeln(`Branch "${branchName}" created successfully.`);
      }
    } else {
      term.writeln('Usage: git branch [branch-name]');
    }

    const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
    term.write(greenBoldDollar);
  } catch (error) {
    console.error("Error processing git branch command: ", error);
    term.writeln('Error: Unable to process git branch command.');
  }
};
