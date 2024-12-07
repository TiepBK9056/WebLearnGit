import * as git from 'isomorphic-git';
import BrowserFS from 'browserfs';
import { Terminal } from 'xterm';

// Đường dẫn đến thư mục Git
const dir = '/myfolder'; 
const fs = BrowserFS.BFSRequire('fs');

// Hàm xử lý lệnh git add
export const handleGitAddCommand = (userInput: string, term: Terminal) => {
  const args = userInput.split(' ');

  if (args.length === 1) {
    // Khi chỉ có git add mà không có file name
    term.write("Error: Missing file name. Usage: git add <fileName>\r\n");
    const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
    term.write(greenBoldDollar);
  } else if (args[2] === '.') {
    // Lệnh git add .
    term.write('Adding all modified and untracked files...\r\n');
    
    // Lấy trạng thái của tất cả các tệp trong repo
    git.statusMatrix({
      fs,
      dir,
      filepaths: ['.'],  // Duyệt tất cả các tệp trong thư mục hiện tại
    })
    .then(statusMatrix => {
      // Lọc các tệp cần thêm vào staging area (modified hoặc untracked)
      const filesToAdd = statusMatrix
        .filter(([file, , workdirStatus]) => workdirStatus === 2 || workdirStatus === 0)
        .map(([file]) => file);

      if (filesToAdd.length > 0) {
        // Thêm các tệp vào staging area
        const addPromises = filesToAdd.map(file =>
          git.add({ fs, dir, filepath: file })
        );

        // Đợi tất cả các tệp được thêm vào staging area
        Promise.all(addPromises)
          .then(() => {
            term.write('All modified and untracked files added to staging area.\r\n');
            const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
            term.write(greenBoldDollar);
          })
          .catch(err => {
            term.write(`Error adding files: ${err.message}\r\n`);
            const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
    term.write(greenBoldDollar);
          });
      } else {
        term.write("No files to add. All files are up-to-date.\r\n");
        const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
        term.write(greenBoldDollar);
      }
    })
    .catch(err => {
      term.write(`Error checking status: ${err.message}\r\n`);
      const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
      term.write(greenBoldDollar);
    });
  } else {
    // Lệnh git add <file>
    const filepath = args[2];

    // Thêm tệp vào staging area
    git.add({ fs, dir, filepath })
      .then(() => {
        term.write(`${filepath} added to staging area.\r\n`);
        const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
    term.write(greenBoldDollar);
      })
      .catch(err => {
        term.write(`Error adding file ${filepath}: ${err.message}\r\n`);
        const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
        term.write(greenBoldDollar);
      });
  }
};
