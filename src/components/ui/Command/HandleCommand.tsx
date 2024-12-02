import { Terminal } from 'xterm';
import BrowserFS from 'browserfs';
import * as git from 'isomorphic-git';

// Giả sử bạn có một danh sách lưu trữ các tệp đã được thêm vào staging area
let stagingArea: string[] = []; 

// Hàm xử lý lệnh git init
export const handleGitInitCommand = (term: Terminal) => {
  const fs = BrowserFS.BFSRequire('fs');
  const dirPath = '/myfolder/.git';  // Đường dẫn thư mục Git

  // Kiểm tra nếu thư mục '.git' đã tồn tại
  fs.readdir('/myfolder', (err: Error | null | undefined, files: string[] | undefined) => {  
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
      dir: '/myfolder', 
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
  } else if (userInput.startsWith("git add")) {
    const args = userInput.split(" ");
    const fs = BrowserFS.BFSRequire('fs');

    if (args.length === 1) {
      term.write("Error: Missing file name. Usage: git add <fileName>\r\n");
      term.write("$ ");
    } else if (args[2] === ".") {
      // Xử lý lệnh `git add .` để thêm tất cả các tệp vào staging area
      fs.readdir('/myfolder', (err: Error | null | undefined, files: string[] | undefined) => {
        if (err) {
          term.write(`Error: ${err.message}\r\n`);
          term.write("$ ");
          return;
        }

        if (files) {
          // Thêm tất cả tệp vào staging area
          stagingArea = files.filter(file => file !== '.git');  // Loại trừ thư mục .git
          term.write("All files added to staging area.\r\n");
          term.write("$ ");
        }
      });
    } else {
      // Xử lý lệnh `git add <file>`
      const fileName = args[2];
      fs.readdir('/myfolder', (err: Error | null | undefined, files: string[] | undefined) => {
        if (err) {
          term.write(`Error: ${err.message}\r\n`);
          term.write("$ ");
          return;
        }

        if (files && files.includes(fileName)) {
          // Thêm tệp vào staging area
          stagingArea.push(fileName);
          term.write(`File '${fileName}' added to staging area.\r\n`);
          term.write("$ ");
        } else {
          term.write(`Error: File '${fileName}' not found.\r\n`);
          term.write("$ ");
        }
      });
    }
  } else {
    term.write("Command not recognized.\r\n");
    term.write("$ ");  // Hiển thị lại dấu nhắc lệnh sau khi xử lý
  }
};
