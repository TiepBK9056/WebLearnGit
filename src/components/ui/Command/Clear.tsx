// Clear.tsx
import { Terminal } from 'xterm';

export const handleClearCommand = (term: Terminal) => {
  term.clear();
  term.writeln("Welcome to the 4Frog group! Type something.");
  term.write("$ ");
};
