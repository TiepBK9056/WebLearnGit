"use client";

import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import BrowserFS from 'browserfs';
import { handleCommand } from '@/components/ui/Command/command';  // Import hàm handleCommand

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    // Cấu hình BrowserFS khi component được mount
    BrowserFS.install(window);
    BrowserFS.configure({
      fs: "LocalStorage",
      options: {}
    }, (err: Error | null | undefined) => {
      if (err) {
        console.error("Failed to initialize BrowserFS", err);
        return;
      }

      // Cấu hình terminal
      const term = new Terminal({
        theme: {
          background: '#2e2e2e',
          foreground: '#f1f1f1',
          cursor: 'yellow',
        },
        fontFamily: 'Monaco, Courier, monospace',
        fontSize: 16,
        cursorBlink: true,
        rows: 27,
        cols: 50,
        lineHeight: 1.2,
      });

      const measureCharWidth = () => {
        const span = document.createElement('span');
        span.innerText = 'W';
        document.body.appendChild(span);
        const width = span.getBoundingClientRect().width;
        document.body.removeChild(span);
        return width;
      };

      const charWidth = measureCharWidth();
      const numColumns = 35;
      const newWidth = charWidth * numColumns;
      setWidth(newWidth);

      terminalRef.current && term.open(terminalRef.current);
      term.write("Welcome to the 4Frog group! Type something.\r\n$ ");

      let userInput = '';
      let cursorPosition = 2;

      term.onData((data) => {
        if (data === "\r") {
          term.write("\r\n");
          cursorPosition = 0;

          // Gọi hàm xử lý lệnh từ command.tsx
          handleCommand(userInput, term);

          // Reset input sau khi xử lý
          userInput = '';
        } else if (data === "\x08" || data === "\x7f") {
          if (cursorPosition > 0) {
            term.write("\b \b");
            cursorPosition--;
            userInput = userInput.slice(0, -1);
          }
        } else {
          term.write(data);
          cursorPosition++;
          userInput += data;
        }
      });
    });

  }, []);

  return (
    <div 
      ref={terminalRef} 
      style={{
        margin: '10px',
        width: width,
        height: '90vh',
        backgroundColor: 'hsl(215.4, 16.3%, 46.9%)',
        padding: '10px',
        paddingTop: '30px',
        borderRadius: '10px',
      }} 
    />
  );
};

export default TerminalComponent;
