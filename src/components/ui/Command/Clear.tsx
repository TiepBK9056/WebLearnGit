// Clear.tsx
import { Terminal } from 'xterm';

export const handleClearCommand = (term: Terminal) => {
  term.clear();
  term.write("$ ");
};
