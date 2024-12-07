"use client";

import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import BrowserFS from 'browserfs';
import { handleCommand } from '@/components/ui/Command/HandleCommand';  // Import hàm handleCommand

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const [width, setWidth] = useState(0);

  // Hàm tính số dòng dựa trên chiều cao màn hình
  const calculateRows = () => {
    const rowHeight = 26; // Chiều cao 1 dòng = 26px
    const screenHeight = window.innerHeight; // Chiều cao màn hình
    return Math.floor((screenHeight * 0.84) / rowHeight); // Lấy 70% chiều cao màn hình và làm tròn xuống
  };

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
        rows: calculateRows(), // Sử dụng số dòng đã tính toán
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
      term.writeln("Welcome to the 4Frog group! Type something.");
      const greenBoldDollar = '\x1b[1m\x1b[32m$\x1b[0m '; // $ in bold green
      term.write(greenBoldDollar);

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

      setTerminal(term);

      // Lắng nghe sự kiện resize
      const handleResize = () => {
        if (term) {
          const rows = calculateRows();
          term.resize(term.cols, rows); // Cập nhật số dòng
        }
      };

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize); // Gỡ sự kiện khi component unmount
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
