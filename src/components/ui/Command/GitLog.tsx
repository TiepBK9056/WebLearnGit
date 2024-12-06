// components/ui/Command/GitLog.tsx
import * as git from 'isomorphic-git';
import BrowserFS from 'browserfs';
import { Terminal } from 'xterm';

// Đường dẫn đến thư mục Git
const dir = '/myfolder'; 
const fs = BrowserFS.BFSRequire('fs');

// Hàm xử lý lệnh git log
export const handleGitLogCommand = (userInput: string, term: Terminal) => {
  const args = userInput.split(' ');

  // Xử lý các tham số của lệnh git log
  let depth = 5; // Mặc định lấy 5 commit gần nhất
  let ref = 'HEAD'; // Mặc định là HEAD (nhánh hiện tại)
  
  // Kiểm tra các tham số của lệnh
  if (args.length > 1) {
    if (args[1] === '--depth' && args.length >= 3) {
      depth = parseInt(args[2], 10); // Cập nhật độ sâu nếu có
    } else if (args[1] === '--ref' && args.length >= 3) {
      ref = args[2]; // Cập nhật ref nếu có
    }
  }

  // Truy vấn commit logs
  git.log({
    fs,
    dir,
    depth,
    ref
  })
  .then(commits => {
    if (commits.length === 0) {
      term.write("No commits found.\r\n");
    } else {
      commits.forEach(commit => {
        const commitMessage = commit.commit.message;
        const authorName = commit.commit.author.name;
        const authorEmail = commit.commit.author.email;
        const timestamp = new Date(commit.commit.author.timestamp * 1000).toLocaleString();
        
        term.write(`Commit ID: ${commit.oid}\r\n`);
        term.write(`Author: ${authorName} <${authorEmail}>\r\n`);
        term.write(`Date: ${timestamp}\r\n`);
        term.write(`Message: ${commitMessage}\r\n`);
        term.write('-----------------------------------------\r\n');
      });
    }
    term.write("$ ");
  })
  .catch(err => {
    term.write(`Error fetching git log: ${err.message}\r\n`);
    term.write("$ ");
  });
};
