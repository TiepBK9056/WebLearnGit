import { Terminal } from 'xterm';
import BrowserFS from 'browserfs';

export const handleTouchCommand = (userInput: string, term: Terminal) => {
  const fs = BrowserFS.BFSRequire('fs');
  const fileName = userInput.split(' ')[1];

  if (!fileName) {
    term.write('Error: Please specify a file name.\r\n');
    term.write('$ ');
    return;
  }

  // Kiểm tra xem file đã tồn tại chưa bằng fs.stat
  fs.stat(fileName, (err: any, stats: any) => {
    if (!err && stats.isFile()) {
      term.write(`Error: File '${fileName}' already exists.\r\n`);
      term.write('$ ');
    } else {
      // Nếu không có lỗi, tức là file không tồn tại, thì tạo file mới
      fs.writeFile(fileName, '', (err: any) => {
        if (err) {
          term.write(`Error: ${err.message}\r\n`);
        } else {
          term.write(`File '${fileName}' created successfully.\r\n`);
        }
        term.write('$ ');
      });
    }
  });
};
