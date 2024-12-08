import * as git from 'isomorphic-git';
import BrowserFS from 'browserfs';
import { Terminal } from 'xterm';

const fs = BrowserFS.BFSRequire('fs'); // FS client sử dụng BrowserFS
const dir = '/myfolder'; // Đường dẫn thư mục gốc chứa .git

export const handleGitBranchCommand = async (command: string, term: Terminal) => {
  try {
    // Tách lệnh và đối số (nếu có)
    const args = command.trim().split(/\s+/);

    if (args.length === 2 && args[1] === 'branch') {
      // Liệt kê tất cả các nhánh
      try {
        const branches = await git.listBranches({ fs, dir });
        const currentBranch = await git.currentBranch({ fs, dir });
        const headCommit = await git.resolveRef({ fs, dir, ref: 'HEAD' });

        term.writeln('Git Branches:');
        if (branches.length === 0) {
          term.writeln('No branches available.');
        } else {
          branches.forEach(branch => {
            if (branch === currentBranch) {
              // Tô màu xanh cho nhánh hiện tại
              term.write(`\x1b[32m* ${branch}\x1b[0m\r\n`);
            } else {
              term.writeln(`  ${branch}`);
            }
          });

          // Nếu HEAD đang ở trạng thái detached, hiển thị hash của commit
          if (!currentBranch) {
            term.write(`\x1b[33m* (HEAD detached at ${headCommit.slice(0, 7)})\x1b[0m\r\n`); // Mã hash màu vàng
          }
        }
      } catch (err) {
        term.writeln('Error: Unable to list branches. Make sure this is a valid Git repository.');
      }
    } else if (args.length === 3 && args[1] === 'branch') {
      // Tạo nhánh mới
      const branchName = args[2];
      try {
        const branches = await git.listBranches({ fs, dir });
        if (branches.includes(branchName)) {
          term.writeln(`Error: Branch "${branchName}" already exists.`);
        } else {
          await git.branch({ fs, dir, ref: branchName });
          term.writeln(`Branch "${branchName}" created successfully.`);
        }
      } catch (err) {
        term.writeln(`Error: Unable to create branch "${branchName}".`);
      }
    } else {
      term.writeln('Usage: git branch [branch-name]');
    }

    // Hiển thị dấu `$` màu xanh lá
    const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
    term.write(greenBoldDollar);

  } catch (error) {
    console.error("Error processing git branch command: ", error);
    term.writeln('Error: Unable to process git branch command.');
    term.write('\x1b[1m\x1b[32m$\x1b[0m ');
  }
};
