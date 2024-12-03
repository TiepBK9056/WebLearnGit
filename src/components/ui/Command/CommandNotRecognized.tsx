// CommandNotRecognized.tsx
import { Terminal } from 'xterm';

export const handleCommandNotRecognized = (term: Terminal) => {
  term.write("Command not recognized.\r\n");
  term.write("$ ");
};
