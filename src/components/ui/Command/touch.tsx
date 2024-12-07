import { Terminal } from 'xterm';
import BrowserFS from 'browserfs';

export const handleTouchCommand = (userInput: string, term: Terminal) => {
  const fs = BrowserFS.BFSRequire('fs');
  const fileName = userInput.split(' ')[1];

  if (!fileName) {
    term.writeln('Error: Please specify a file name.');
    const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
    term.write(greenBoldDollar);
    return;
  }

  const filePath = `/myfolder/${fileName}`;

  // Kiểm tra xem file đã tồn tại chưa bằng fs.stat
  fs.stat(filePath, (err: any, stats: any) => {
    if (!err && stats.isFile()) {
      term.write(`Error: File '${filePath}' already exists.`);
      const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
      term.write(greenBoldDollar);
    } else {
      // Nếu không có lỗi, tức là file không tồn tại, thì tạo file mới
      fs.writeFile(filePath, '', (err: any) => {
        if (err) {
          term.writeln(`Error: ${err.message}`);
        } else {
          term.writeln(`File '${filePath}' created successfully.`);
        }
        const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
        term.write(greenBoldDollar);
      });
    }
  });
};
