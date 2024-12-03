// GitInit.tsx
import { Terminal } from 'xterm';
import BrowserFS from 'browserfs';
import * as git from 'isomorphic-git';

export const handleGitInitCommand = (term: Terminal) => {
  const fs = BrowserFS.BFSRequire('fs');
  
  fs.readdir('/myfolder', (err: Error | null | undefined, files: string[] | undefined) => {
    if (err) {
      term.write(`Error: ${err.message}\r\n`);
      term.write("$ ");
      return;
    }

    if (files && files.includes('.git')) {
      term.write("Error: Repository already initialized.\r\n");
      term.write("$ ");
      return;
    }

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
