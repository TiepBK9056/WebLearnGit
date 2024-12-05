'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GitContextType {
  gitTree: string; // Cây Git hiện tại (có thể là commit log hoặc trạng thái hiện tại)
  updateGitTree: (newTree: string) => void;
}

const GitContext = createContext<GitContextType | undefined>(undefined);

export const useGitContext = () => {
  const context = useContext(GitContext);
  if (!context) {
    throw new Error("useGitContext must be used within a GitProvider");
  }
  return context;
};

interface GitProviderProps {
  children: ReactNode; // Đảm bảo children có kiểu là ReactNode
}

export const GitProvider: React.FC<GitProviderProps> = ({ children }) => {
  const [gitTree, setGitTree] = useState<string>("");

  const updateGitTree = (newTree: string) => {
    setGitTree(newTree);
  };

  return (
    <GitContext.Provider value={{ gitTree, updateGitTree }}>
      {children}
    </GitContext.Provider>
  );
};
