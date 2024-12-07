// CommandNotRecognized.tsx
import { Terminal } from 'xterm';

export const handleCommandNotRecognized = (term: Terminal) => {
  term.write("Command not recognized.\r\n");
  const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
  term.write(greenBoldDollar);
};
