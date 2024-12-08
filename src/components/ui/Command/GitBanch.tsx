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
        const currentBranch = await git.currentBranch({ fs, dir }) || 'HEAD';

        term.writeln('Git Branches:');
        if (branches.length === 0) {
          term.writeln('No branches available.');
        } else {
          branches.forEach(branch => {
            if (branch === currentBranch) {
              term.write(`\x1b[32m* ${branch}\x1b[0m\r\n`); // Màu xanh cho nhánh hiện tại
            } else {
              term.writeln(`  ${branch}`);
            }
          });

          // Kiểm tra trạng thái HEAD
          if (!currentBranch) {
            const headCommit = await git.resolveRef({ fs, dir, ref: 'HEAD' });
            term.write(`\x1b[33m* (HEAD detached at ${headCommit.slice(0, 7)})\x1b[0m\r\n`);
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
    } else if (args.length === 4 && args[1] === 'branch') {
      // Tạo nhánh từ mã hash
      const branchName = args[2];
      const commitHash = args[3];

      try {
        // Kiểm tra commit hash có hợp lệ hay không
        const logs = await git.log({ fs, dir });
        const matchingCommit = logs.find(log => log.oid.startsWith(commitHash));

        if (!matchingCommit) {
          term.writeln(`Error: Commit "${commitHash}" not found.`);
        } else {
          await git.branch({ fs, dir, ref: branchName, object: matchingCommit.oid });
          term.writeln(`Branch "${branchName}" created at commit "${matchingCommit.oid}" successfully.`);
        }
      } catch (err) {
        term.writeln(`Error: Unable to create branch "${branchName}" at commit "${commitHash}".`);
      }
    } else {
      term.writeln('Usage: git branch [branch-name] [commit-hash]');
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
