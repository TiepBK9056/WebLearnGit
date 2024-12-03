// GitAdd.tsx
import { Terminal } from 'xterm';
import BrowserFS from 'browserfs';

let stagingArea: string[] = [];  // Lưu trữ các tệp đã thêm vào staging area

export const handleGitAddCommand = (userInput: string, term: Terminal) => {
  const args = userInput.split(" ");
  const fs = BrowserFS.BFSRequire('fs');

  if (args.length === 1) {
    term.write("Error: Missing file name. Usage: git add <fileName>\r\n");
    term.write("$ ");
  } else if (args[1] === ".") {
    // Lệnh git add .
    fs.readdir('/myfolder', (err: Error | null | undefined, files: string[] | undefined) => {
      if (err) {
        term.write(`Error: ${err.message}\r\n`);
        term.write("$ ");
        return;
      }

      if (files) {
        stagingArea = files.filter(file => file !== '.git');  // Loại bỏ thư mục .git
        term.write("All files added to staging area.\r\n");
        term.write("$ ");
      }
    });
  } else {
    // Lệnh git add <file>
    const fileName = args[1];
    fs.readdir('/myfolder', (err: Error | null | undefined, files: string[] | undefined) => {
      if (err) {
        term.write(`Error: ${err.message}\r\n`);
        term.write("$ ");
        return;
      }

      if (files && files.includes(fileName)) {
        stagingArea.push(fileName);  // Thêm tệp vào staging area
        term.write(`File '${fileName}' added to staging area.\r\n`);
        term.write("$ ");
      } else {
        term.write(`Error: File '${fileName}' not found.\r\n`);
        term.write("$ ");
      }
    });
  }
};
