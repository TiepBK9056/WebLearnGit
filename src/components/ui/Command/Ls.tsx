import { Terminal } from "xterm";
import BrowserFS from 'browserfs';

export const handleLsCommand = (command: string, term: Terminal) => {
  const userInput = command.trim();

  if (userInput === "ls") {
    const fs = BrowserFS.BFSRequire('fs');

    // Đọc thư mục /myfolder thay vì thư mục hiện tại
    fs.readdir('/myfolder', (err: unknown, files: string[] | undefined) => {
      if (err) {
        // Kiểm tra lỗi và hiển thị thông báo
        if (err instanceof Error) {
          term.write(`Error: ${err.message}\r\n`);
        } else {
          term.write(`Unknown error occurred.\r\n`);
        }
      } else {
        // Kiểm tra và liệt kê các tệp và thư mục trong /myfolder
        if (files && Array.isArray(files)) {
          if (files.length === 0) {
            term.write("No files or directories found in /myfolder.\r\n");
          } else {
            term.write(files.join("\r\n") + "\r\n");
          }
        } else {
          term.write("Error: Unable to read directory /myfolder.\r\n");
        }
      }
      const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
      term.write(greenBoldDollar);
    });
  } else {
    term.write("Error: Invalid 'ls' command.\r\n");
    const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
    term.write(greenBoldDollar);
  }
};
