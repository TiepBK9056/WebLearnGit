import { Terminal } from 'xterm';

export const handleClearCommand = (term: Terminal) => {
  term.clear();
  term.writeln("Welcome to the 4Frog group! Type something.");
  
  // ANSI escape codes: \x1b[1m -> bold, \x1b[32m -> green, \x1b[0m -> reset
  const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
  term.write(greenBoldDollar);
};
