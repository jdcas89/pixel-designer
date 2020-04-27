import React from 'react';
import { Pixel, RowType } from '../utils/grid-example';

interface BoardContextProps {
  updateBoard?: (pixel: Pixel) => void;
  board?: RowType[];
}

export const BoardContext = React.createContext<BoardContextProps>({});
