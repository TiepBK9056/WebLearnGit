import * as git from 'isomorphic-git';
import BrowserFS from 'browserfs';
import { Terminal } from 'xterm';

const fs = BrowserFS.BFSRequire('fs'); // FS client sử dụng BrowserFS
const dir = '/myfolder'; // Đường dẫn thư mục gốc chứa .git

// Hàm xử lý lệnh git checkout
export const handleGitCheckoutCommand = async (command: string, term: Terminal) => {
  try {
    const args = command.trim().split(/\s+/);
    
    if (args.length < 4) {
      term.writeln('Usage: git checkout <branch-name>');
      term.write("$ ");
      return;
    }

    const branchName = args[3];
    
    // Đối tượng options cho lệnh checkout
    const options = {
      fs,
      dir,
      ref: branchName,  // Nhánh cần checkout
      force: false,     // Ghi đè lên tệp nếu cần
      dryRun: false,    // Chạy thử mà không thực hiện thay đổi
      noCheckout: false,  // Cập nhật working directory
      noUpdateHead: false, // Cập nhật HEAD
      track: true,        // Theo dõi nhánh remote nếu cần
    };

    // Kiểm tra nếu có các tùy chọn bổ sung
    if (args.includes('--force')) {
      options.force = true;
    }
    if (args.includes('--dry-run')) {
      options.dryRun = true;
    }
    if (args.includes('--no-checkout')) {
      options.noCheckout = true;
    }
    if (args.includes('--no-update-head')) {
      options.noUpdateHead = true;
    }
    if (args.includes('--track=false')) {
      options.track = false;
    }

    // Thực hiện checkout
    await git.checkout(options);

    term.writeln(`Switched to branch "${branchName}" successfully.`);
    
  } catch (error) {
    console.error("Error processing git checkout command: ", error);
    term.writeln('Error: Unable to process git checkout command.');
  }
  
  term.write("$ ");
};
