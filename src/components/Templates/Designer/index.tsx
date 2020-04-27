import React, { useState } from 'react';
import styled from 'styled-components';
import { ColorResult } from 'react-color';
import Row from '../../Atoms/Row';
import EditorTools from '../../Organisms/EditorTools';
import { ToolsContext } from '../../../contexts/ToolsContext';
import { Pixel } from '../../../utils/grid-example';
import { BoardContext } from '../../../contexts/BoardContext';
import { createGrid } from '../../../utils/createGrid';
import useLocalStorage from '../../../utils/useLocalStorage';

const DEFAULT_ROWS = 9;
const DEFAULT_COLUMNS = 50;

const Designer = () => {
  const [savedGrid, setSavedGrid] = useLocalStorage(
    'loom-designer-saved-design',
    JSON.stringify(createGrid(DEFAULT_ROWS, DEFAULT_COLUMNS))
  );
  let grid = JSON.parse(savedGrid);
  if (!savedGrid) {
    grid = createGrid(DEFAULT_ROWS, DEFAULT_COLUMNS);
  }

  const [chosenColor, setChosenColor] = useState('#000000');
  const [isDrawing, setIsDrawing] = useState(true);
  const [boardState, setBoardState] = useState(grid);

  const clearBoardHandler = () => {
    setBoardState(createGrid(DEFAULT_ROWS, DEFAULT_COLUMNS));
    setSavedGrid(JSON.stringify(createGrid(DEFAULT_ROWS, DEFAULT_COLUMNS)));
  };

  const handleChangeColor = (color: ColorResult) => {
    setChosenColor(color.hex);
  };

  const updateBoard = (pixel: Pixel) => {
    const newBoardState = boardState.map((row) => {
      return row.map((p) => {
        if (p.x === pixel.x && p.y === pixel.y) {
          p = pixel;
        }
        return p;
      });
    });
    setBoardState(newBoardState);
    setSavedGrid(JSON.stringify(newBoardState));
  };

  const createNewBoardHandler = (rows, columns) => {
    setBoardState(createGrid(rows, columns));
    setSavedGrid(JSON.stringify(createGrid(rows, columns)));
  };

  return (
    <DesignerContainer>
      <BoardContext.Provider value={{ board: boardState, updateBoard }}>
        <ToolsContext.Provider value={{ isDrawing }}>
          <PatternContainer>
            {boardState.map((row, i) => (
              <Row key={i} row={row} chosenColor={chosenColor} />
            ))}
          </PatternContainer>
          <EditorTools
            createNewBoard={createNewBoardHandler}
            clearBoard={clearBoardHandler}
            setIsDrawing={setIsDrawing}
            isDrawing={isDrawing}
            handleChangeColor={handleChangeColor}
            chosenColor={chosenColor}
          />
        </ToolsContext.Provider>
      </BoardContext.Provider>
    </DesignerContainer>
  );
};

const DesignerContainer = styled.div`
  display: flex;
  background-color: #9b59b655;
`;

const PatternContainer = styled.div`
  display: grid;
  padding: 16px;
  width: 100%;
  margin: auto;
  position: relative;
  overflow-x: scroll;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

export default Designer;
