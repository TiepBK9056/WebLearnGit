import { Terminal } from "xterm";
import BrowserFS from 'browserfs';

export const handleMkdirCommand = (command: string, term: Terminal) => {
  const userInput = command.trim();

  // Kiểm tra nếu lệnh là mkdir
  if (userInput.startsWith("mkdir")) {
    const args = userInput.split(" ");
    if (args.length === 2 && args[0] === "mkdir") {
      const folderName = args[1];

      if (folderName) {
        const fs = BrowserFS.BFSRequire('fs');

        // Kiểm tra nếu thư mục '/myfolder' đã tồn tại
        fs.readdir('/', (err: unknown, files: string[] | undefined) => {
          if (err) {
            // Ép kiểu err thành Error nếu có lỗi
            if (err instanceof Error) {
              term.write(`Error: ${err.message}\r\n`);
            } else {
              term.write(`Unknown error: ${err}\r\n`);
            }
            const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
            term.write(greenBoldDollar);
            return;
          }

          // Kiểm tra xem files có phải là mảng và không phải là undefined
          if (files && Array.isArray(files)) {
            // Nếu thư mục myfolder chưa tồn tại, tạo thư mục myfolder
            if (!files.includes('myfolder')) {
              fs.mkdir('/myfolder', (err: unknown) => {
                if (err) {
                  // Ép kiểu err thành Error nếu có lỗi
                  if (err instanceof Error) {
                    term.write(`Error creating '/myfolder': ${err.message}\r\n`);
                  } else {
                    term.write(`Unknown error: ${err}\r\n`);
                  }
                } else {
                  term.write("Directory '/myfolder' created successfully!\r\n");
                  // Tiến hành tạo thư mục con
                  createFolder(folderName, fs, term);
                }
                const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
                term.write(greenBoldDollar);
              });
            } else {
              // Nếu thư mục myfolder đã tồn tại, tiến hành tạo thư mục con
              createFolder(folderName, fs, term);
            }
          } else {
            term.write("Error: Unable to read the directory or 'files' is undefined.\r\n");
            const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
            term.write(greenBoldDollar);
          }
        });
      } else {
        term.write("Error: Missing folder name.\r\n");
        const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
        term.write(greenBoldDollar);
      }
    } else {
      term.write("Error: Invalid 'mkdir' command syntax. Usage: mkdir <folderName>\r\n");
      const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
      term.write(greenBoldDollar);
    }
  } else {
    term.write("Command not recognized.\r\n");
    const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
    term.write(greenBoldDollar);
  }
};

// Hàm tạo thư mục con trong '/myfolder'
const createFolder = (folderName: string, fs: any, term: Terminal) => {
  fs.mkdir(`/myfolder/${folderName}`, (err: unknown) => {
    if (err) {
      // Ép kiểu err thành Error nếu có lỗi
      if (err instanceof Error) {
        term.write(`Error: ${err.message}\r\n`);
      } else {
        term.write(`Unknown error: ${err}\r\n`);
      }
    } else {
      term.write(`Directory '${folderName}' created successfully in /myfolder!\r\n`);
    }
  });
};
