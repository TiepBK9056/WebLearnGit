// handleCommand.tsx
import { handleClearCommand } from '@/components/ui/Command/Clear';
import { handleCommandNotRecognized } from '@/components/ui/Command/CommandNotRecognized';
import { handleGitAddCommand } from '@/components/ui/Command/GitAdd';
import { handleGitInitCommand } from '@/components/ui/Command/GitInit';
import { handleMkdirCommand } from '@/components/ui/Command/Mkdir';
import { Terminal } from 'xterm';
 

export const handleCommand = (command: string, term: Terminal) => {
  const userInput = command.trim();
  
  if (userInput.startsWith("mkdir")) {
    handleMkdirCommand(userInput, term);  // Gọi lệnh mkdir
  } else if (userInput === "clear") {
    handleClearCommand(term);  // Gọi lệnh clear
  } else if (userInput === "git init") {
    handleGitInitCommand(term);  // Gọi lệnh git init
  } else if (userInput.startsWith("git add")) {
    handleGitAddCommand(userInput, term);  // Gọi lệnh git add
  } else {
    handleCommandNotRecognized(term);  // Xử lý lệnh không nhận diện được
  }
};
