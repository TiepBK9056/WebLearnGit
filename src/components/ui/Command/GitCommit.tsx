// components/ui/Command/GitCommit.tsx
import * as git from 'isomorphic-git';
import BrowserFS from 'browserfs';
import { Terminal } from 'xterm';

// Đường dẫn đến thư mục Git
const dir = '/myfolder'; 
const fs = BrowserFS.BFSRequire('fs');

// Hàm xử lý lệnh git commit
export const handleGitCommitCommand = (userInput: string, term: Terminal) => {
  const args = userInput.split(' ');

  if (args.length < 4 || args[2] !== '-m') {
    // Kiểm tra nếu thiếu -m hoặc thông điệp commit
    term.write("Error: Invalid commit syntax. Usage: git commit -m <message>\r\n");
    const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
    term.write(greenBoldDollar);
  } else {
    // Lệnh git commit -m "message"
    const commitMessage = args.slice(2).join(' ');

    // Thực hiện commit
    git.commit({
      fs,
      dir,
      author: {
        name: 'Your Name', // Bạn có thể thay thế bằng tên người dùng
        email: 'your-email@example.com', // Thay thế bằng email người dùng
      },
      message: commitMessage,
    })
    .then(() => {
      term.write(`Commit successful: ${commitMessage}\r\n`);
      const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
      term.write(greenBoldDollar);
    })
    .catch((err) => {
      term.write(`Error: ${err.message}\r\n`);
      const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
      term.write(greenBoldDollar);
    });
  }
};
