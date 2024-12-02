import { Terminal } from "xterm";
import BrowserFS from 'browserfs';

export const handleCommand = (command: string, term: Terminal) => {
    const userInput = command.trim();
    
    if (userInput.startsWith("mkdir")) {
      // Kiểm tra chính xác lệnh 'mkdir' và cú pháp
      const args = userInput.split(" ");
      if (args.length === 2 && args[0] === "mkdir") {  // Chỉ cho phép 'mkdir' chính xác
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
          term.write("$ ");  // Hiển thị lại dấu nhắc lệnh sau khi xử lý
        }
      } else {
        term.write("Error: Invalid 'mkdir' command syntax. Usage: mkdir <folderName>\r\n");
        term.write("$ ");  // Hiển thị lại dấu nhắc lệnh sau khi xử lý
      }
    } else {
      term.write("Command not recognized.\r\n");
      term.write("$ ");  // Hiển thị lại dấu nhắc lệnh sau khi xử lý
    }
  };
  