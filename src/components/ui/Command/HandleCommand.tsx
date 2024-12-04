// handleCommand.tsx
import { handleClearCommand } from '@/components/ui/Command/Clear';
import { handleCommandNotRecognized } from '@/components/ui/Command/CommandNotRecognized';
import { handleGitAddCommand } from '@/components/ui/Command/GitAdd';
import { handleGitCommitCommand } from '@/components/ui/Command/GitCommit';
import { handleGitInitCommand } from '@/components/ui/Command/GitInit';
import { handleGitStatusCommand } from '@/components/ui/Command/GitStatus';
import { handleLsCommand } from '@/components/ui/Command/Ls';
import { handleMkdirCommand } from '@/components/ui/Command/Mkdir';
import { handleTouchCommand } from '@/components/ui/Command/touch';
import { Terminal } from 'xterm';
 

export const handleCommand = (command: string, term: Terminal) => {
  const userInput = command.trim();
  
  if (userInput.startsWith("mkdir")) {
    handleMkdirCommand(userInput, term);
  } else if (userInput === "clear") {
    handleClearCommand(term);
  } else if (userInput === "git init") {
    handleGitInitCommand(term);
  } else if (userInput.startsWith("git add")) {
    handleGitAddCommand(userInput, term);
  } else if (userInput === "git status") {
    handleGitStatusCommand(term);
  } else if (userInput.startsWith("git commit")) {  // Xử lý lệnh git commit
    handleGitCommitCommand(userInput, term);  
  } else if (userInput.startsWith("touch")) {
    handleTouchCommand(userInput, term);
  } else if (userInput.startsWith("ls")) {
    handleLsCommand(userInput, term);
  } else {
    handleCommandNotRecognized(term);
  }
};
