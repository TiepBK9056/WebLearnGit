"use client";

import React, { useRef, useEffect, useState } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const terminal = new Terminal({
        theme: {
          background: '#2e2e2e',  // Thay đổi màu nền tại đây
          foreground: '#f1f1f1',   // Màu chữ
          cursor: 'yellow',       // Màu con trỏ
        },
        fontFamily: 'Monaco, Courier, monospace',  // Font chữ
        fontSize: 16,                 // Kích thước font
        cursorBlink: true,            // Con trỏ nhấp nháy
        rows: 27,                     // Số dòng của terminal
        cols: 50,                     // Số cột của terminal
        lineHeight: 1.2,              // Khoảng cách dòng
      });

      const measureCharWidth = () => {
        // Tạo một element để đo chiều rộng của một ký tự
        const span = document.createElement('span');
        span.innerText = 'W';  // Chọn ký tự rộng như "W" để đo
        document.body.appendChild(span);
        const width = span.getBoundingClientRect().width;
        document.body.removeChild(span);
        return width;
      };

      const charWidth = measureCharWidth(); // Lấy chiều rộng của một ký tự
      const numColumns = 35;  // Số cột bạn muốn terminal có
      const newWidth = charWidth * numColumns;

      setWidth(newWidth);
    // Gắn terminal vào DOM
    if (terminalRef.current) {
      terminal.open(terminalRef.current);
      terminal.write("Welcome to the 4Frog group! Type something.\r\n$ ");

      // Lưu trữ vị trí con trỏ
      let cursorPosition = 2; // Bắt đầu sau dấu `$`

      // Xử lý input từ terminal
      terminal.onData((data) => {
        if (data === "\r") {  // Khi người dùng nhấn Enter
          terminal.write("\r\n$ ");  // Hiển thị dấu $ sau khi Enter
          cursorPosition = 2; // Reset vị trí con trỏ sau dấu $
        } else if (data === "\x08" || data === "\x7f") {  // Phím Backspace hoặc Delete
          if (cursorPosition > 2) {
            terminal.write("\b \b");  // Di chuyển con trỏ và xóa ký tự
            cursorPosition--;  // Giảm vị trí con trỏ
          }
        } else {
          terminal.write(data);  // Ghi ký tự vào terminal
          cursorPosition++; // Tăng vị trí con trỏ
        }
      });
    }

    return () => {
      terminal.dispose();  // Dọn dẹp terminal khi component bị unmount
    };
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
        borderRadius: '10px',  // Bo góc terminal
      }} 
    />
  );
};

export default TerminalComponent;
