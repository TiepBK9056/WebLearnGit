import * as git from 'isomorphic-git';
import BrowserFS from 'browserfs';
import { Terminal } from 'xterm';

const fs = BrowserFS.BFSRequire('fs'); // FS client sử dụng BrowserFS
const dir = '/myfolder'; // Đường dẫn thư mục gốc chứa .git

// Hàm xử lý lệnh git checkout
export const handleGitCheckoutCommand = async (command: string, term: Terminal) => {
  try {
    const args = command.trim().split(/\s+/);
    
    if (args.length < 3) {
      term.writeln('Usage: git checkout <branch-name | commit-hash>');
      const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
      term.write(greenBoldDollar);
      return;
    }

    const branchOrHash = args[2];
    
    // Lấy danh sách các nhánh hiện có
    const branches = await git.listBranches({ fs, dir });

    if (branches.includes(branchOrHash)) {
      // Nếu tồn tại nhánh, thực hiện checkout
      await git.checkout({ fs, dir, ref: branchOrHash });
      term.writeln(`Switched to branch "${branchOrHash}" successfully.`);
    } else {
      // Nếu không phải nhánh, kiểm tra mã hash ngắn
      const logs = await git.log({ fs, dir });
      const matchingCommit = logs.find(log => log.oid.startsWith(branchOrHash));
      
      if (matchingCommit) {
        // Nếu tìm thấy mã hash, thực hiện checkout
        await git.checkout({ fs, dir, ref: matchingCommit.oid });
        term.writeln(`Switched to commit "${matchingCommit.oid}" successfully.`);
      } else {
        // Không tìm thấy nhánh hoặc mã hash ngắn
        term.writeln(`Error: Branch or commit "${branchOrHash}" not found.`);
      }
    }
  } catch (error) {
    console.error("Error processing git checkout command: ", error);
    term.writeln('Error: Unable to process git checkout command.');
  }
  
  const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
  term.write(greenBoldDollar);
};
