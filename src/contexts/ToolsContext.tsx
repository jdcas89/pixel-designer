import React from 'react';

interface ToolsContextProps {
  isDrawing: boolean;
  currentColor?: string;
}

export const ToolsContext = React.createContext<ToolsContextProps>({ isDrawing: true });
