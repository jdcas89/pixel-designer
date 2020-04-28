import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { ColorResult } from 'react-color';
import Row from '../../Atoms/Row';
import EditorTools, { ToolType } from '../../Organisms/EditorTools';
import { ToolsContext } from '../../../contexts/ToolsContext';
import { Pixel, RowType } from '../../../utils/grid-example';
import { BoardContext } from '../../../contexts/BoardContext';
import { createGrid } from '../../../utils/createGrid';
import useLocalStorage from '../../../utils/useLocalStorage';
import NumberRow from '../../Atoms/NumberRow';

const DEFAULT_ROWS = 9;
const DEFAULT_COLUMNS = 50;

const Designer = () => {
  const [savedGrid, setSavedGrid] = useLocalStorage(
    'loom-designer-saved-design',
    JSON.stringify(createGrid(DEFAULT_ROWS, DEFAULT_COLUMNS))
  );

  const [savedPixelSize, setSavedPixelSize] = useLocalStorage('loom-designer-saved-pixel-size', JSON.stringify(20));

  let grid = JSON.parse(savedGrid);

  if (!savedGrid) {
    grid = createGrid(DEFAULT_ROWS, DEFAULT_COLUMNS);
  }

  const [pixelSize, setPixelSize] = useState(savedPixelSize);
  const [chosenColor, setChosenColor] = useState('#000000');
  const [currentTool, setCurrentTool] = useState<ToolType>('pen');
  const [boardState, setBoardState] = useState<RowType[]>(grid);

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

  const onPixelSizeChangeHandler = (pS: number) => {
    setSavedPixelSize(JSON.stringify(pS));
    setPixelSize(pS);
  };

  return (
    <DesignerContainer>
      <BoardContext.Provider value={{ board: boardState, updateBoard, pixelSize }}>
        <ToolsContext.Provider value={{ currentTool, setCurrentColor: setChosenColor }}>
          <PatternContainer>
            {boardState.map((row, i) => (
              <Fragment key={i}>
                {i === 0 && <NumberRow row={row} />}
                <Row key={i} row={row} chosenColor={chosenColor} />
              </Fragment>
            ))}
          </PatternContainer>
          <EditorTools
            currentTool={currentTool}
            setCurrentTool={setCurrentTool}
            setPixelSize={onPixelSizeChangeHandler}
            createNewBoard={createNewBoardHandler}
            clearBoard={clearBoardHandler}
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
  @media print {
     {
      background-color: #fff;
    }
  }
`;

const PatternContainer = styled.div`
  display: grid;
  grid-gap: 0;
  padding: 48px 16px;
  width: 100%;
  margin: auto;
  position: relative;
  overflow-x: auto;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

export default Designer;
