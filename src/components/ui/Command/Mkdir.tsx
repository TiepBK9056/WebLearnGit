// Mkdir.tsx
import { Terminal } from 'xterm';
import BrowserFS from 'browserfs';

export const handleMkdirCommand = (userInput: string, term: Terminal) => {
  const args = userInput.split(" ");
  const fs = BrowserFS.BFSRequire('fs');

  if (args.length === 2 && args[0] === "mkdir") {
    const folderName = args[1];
    if (folderName) {
      fs.mkdir(`/myfolder/${folderName}`, (err: Error | null) => {
        if (err) {
          term.write(`Error: ${err.message}\r\n`);
        } else {
          term.write(`Directory '${folderName}' created successfully!\r\n`);
        }
        term.write("$ ");
      });
    } else {
      term.write("Error: Missing folder name.\r\n");
      term.write("$ ");
    }
  } else {
    term.write("Error: Invalid 'mkdir' command syntax. Usage: mkdir <folderName>\r\n");
    term.write("$ ");
  }
};
