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
  let isOneline = false; // Mặc định không bật chế độ oneline
  
  // Kiểm tra các tham số của lệnh
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--depth' && args.length > i + 1) {
      depth = parseInt(args[i + 1], 10); // Cập nhật độ sâu nếu có
      i++;
    } else if (args[i] === '--ref' && args.length > i + 1) {
      ref = args[i + 1]; // Cập nhật ref nếu có
      i++;
    } else if (args[i] === '--oneline') {
      isOneline = true; // Bật chế độ oneline
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
      if (isOneline) {
        // Hiển thị commit theo dạng oneline
        commits.forEach(commit => {
          const shortHash = commit.oid.substring(0, 7); // Lấy 7 ký tự đầu của commit hash
          const message = commit.commit.message.split('\n')[0]; // Lấy dòng đầu tiên của commit message
          term.write(`${shortHash} ${message}\r\n`);
        });
      } else {
        // Hiển thị commit đầy đủ
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
    }
    const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
    term.write(greenBoldDollar);
  })
  .catch(err => {
    term.write(`Error fetching git log: ${err.message}\r\n`);
    const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
    term.write(greenBoldDollar);
  });
};
