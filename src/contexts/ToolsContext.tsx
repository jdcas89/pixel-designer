import React from 'react';
import { ToolType } from '../components/Organisms/EditorTools';

interface ToolsContextProps {
  currentTool: ToolType;
  currentColor?: string;
  setCurrentColor?: (color: string) => void;
  setCurrentTool?: (tool: ToolType) => void;
}

export const ToolsContext = React.createContext<ToolsContextProps>({ currentTool: 'pen' });
