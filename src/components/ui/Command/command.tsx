import { Terminal } from 'xterm';
import BrowserFS from 'browserfs';
import * as git from 'isomorphic-git';

// Hàm xử lý lệnh git init
export const handleGitInitCommand = (term: Terminal) => {
  const fs = BrowserFS.BFSRequire('fs');
  const dirPath = '/myfolder/.git';  // Đường dẫn thư mục Git

  // Kiểm tra nếu thư mục '.git' đã tồn tại
  fs.readdir('/myfolder', (err: Error | null | undefined, files: string[] | undefined) => {  // Sử dụng Error thay vì ApiError
    if (err) {
      term.write(`Error: ${err.message}\r\n`);
      term.write("$ ");
      return;
    }

    // Kiểm tra nếu thư mục đã có .git
    if (files && files.includes('.git')) {
      term.write("Error: Repository already initialized.\r\n");
      term.write("$ ");
      return;
    }

    // Khởi tạo Git repository
    git.init({
      fs,
      dir: '/myfolder', // Đảm bảo đường dẫn tới thư mục của bạn
    }).then(() => {
      term.write("Initialized empty Git repository in /myfolder/.git\r\n");
      term.write("$ ");
    }).catch((err) => {
      term.write(`Error: ${err.message}\r\n`);
      term.write("$ ");
    });
  });
};

// Hàm xử lý các lệnh từ terminal (không bao gồm git init)
export const handleCommand = (command: string, term: Terminal) => {
  const userInput = command.trim();
  
  if (userInput.startsWith("mkdir")) {
    const args = userInput.split(" ");
    if (args.length === 2 && args[0] === "mkdir") {
      const folderName = args[1];
      if (folderName) {
        const fs = BrowserFS.BFSRequire('fs');
        fs.mkdir(`/myfolder/${folderName}`, (err: Error | null) => {
          if (err) {
            term.write(`Error: ${err.message}\r\n`);
          } else {
            term.write(`Directory '${folderName}' created successfully!\r\n`);
          }
          term.write("$ ");  // Hiển thị lại dấu nhắc lệnh sau khi xử lý
        });
      } else {
        term.write("Error: Missing folder name.\r\n");
        term.write("$ ");
      }
    } else {
      term.write("Error: Invalid 'mkdir' command syntax. Usage: mkdir <folderName>\r\n");
      term.write("$ ");
    }
  } else if (userInput === "clear") {
    term.clear();
    term.write("$ ");  // Hiển thị lại dấu nhắc lệnh sau khi clear
  } else if (userInput === "git init") {
    handleGitInitCommand(term);  // Gọi lệnh git init
  } else {
    term.write("Command not recognized.\r\n");
    term.write("$ ");  // Hiển thị lại dấu nhắc lệnh sau khi xử lý
  }
};
