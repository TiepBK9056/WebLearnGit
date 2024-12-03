// handleCommand.tsx
import { handleClearCommand } from '@/components/ui/Command/Clear';
import { handleCommandNotRecognized } from '@/components/ui/Command/CommandNotRecognized';
import { handleGitAddCommand } from '@/components/ui/Command/GitAdd';
import { handleGitInitCommand } from '@/components/ui/Command/GitInit';
import { handleLsCommand } from '@/components/ui/Command/Ls';
import { handleMkdirCommand } from '@/components/ui/Command/Mkdir';
import { handleTouchCommand } from '@/components/ui/Command/touch';
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
  } else if (userInput.startsWith("touch")) {  // Đảm bảo rằng lệnh touch được nhận diện
    handleTouchCommand(userInput, term);  // Gọi lệnh git touch
  } else if (userInput.startsWith("ls")) {  // Đảm bảo rằng lệnh touch được nhận diện
    handleLsCommand(userInput, term);  // Gọi lệnh git touch
  }else {
    handleCommandNotRecognized(term);  // Xử lý lệnh không nhận diện được
  }
};
