import React from 'react';
import { Pixel, RowType } from '../utils/grid-example';

interface BoardContextProps {
  updateBoard?: (pixel: Pixel) => void;
  board?: RowType[];
  pixelSize: number;
  boardPattern: string;
}

export const BoardContext = React.createContext<BoardContextProps>({ pixelSize: 20, boardPattern: 'square' });
