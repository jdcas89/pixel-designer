import React, { Dispatch, SetStateAction, useState } from 'react';
import { faCaretCircleRight, faCog, faEraser, faPen, faTint } from '@fortawesome/pro-solid-svg-icons';
import { ColorChangeHandler, ColorResult, SketchPicker } from 'react-color';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useLocalStorage from '../../../utils/useLocalStorage';

interface EditorToolsProps {
  chosenColor: string;
  handleChangeColor: ColorChangeHandler;
  isDrawing: boolean;
  setIsDrawing: Dispatch<SetStateAction<boolean>>;
  clearBoard: () => void;
  createNewBoard: (rows: number, columns: number) => void;
}

const EditorTools: React.FC<EditorToolsProps> = ({
  handleChangeColor,
  chosenColor,
  isDrawing,
  setIsDrawing,
  clearBoard,
  createNewBoard,
}) => {
  const [savedColorPalette, setSavedColorPalette] = useLocalStorage(
    'loom-designer-saved-color-palette',
    JSON.stringify(['#000', '#fff'])
  );

  const [colorPalette, setColorPalette] = useState(JSON.parse(savedColorPalette));
  return (
    <EditorToolsContainer>
      <Tools>
        <StyledIcon
          isDrawing={isDrawing}
          icon={faPen}
          onClick={() => {
            setIsDrawing(true);
          }}
        />
        <StyledIcon
          isDrawing={!isDrawing}
          icon={faEraser}
          onClick={() => {
            setIsDrawing(false);
          }}
        />
        <StyledIconAlt icon={faTint} />
        <StyledIconAlt icon={faCog} />
        <StyledIconAlt icon={faCaretCircleRight} />
      </Tools>

      <StyledSketchPicker
        presetColors={colorPalette}
        color={chosenColor}
        onChangeComplete={(color: ColorResult) => {
          setColorPalette((prevState) => [...prevState, color.hex]);
          handleChangeColor(color);
        }}
      />
      <ClearBoardButton
        onClick={() => {
          setSavedColorPalette(JSON.stringify(colorPalette));
        }}
      >
        Save color palette
      </ClearBoardButton>
      <ClearBoardButton
        onClick={() => {
          setColorPalette(['#000', '#fff']);
          setSavedColorPalette(JSON.stringify(['#000', '#fff']));
        }}
      >
        Clear color palette
      </ClearBoardButton>
      <ClearBoardButton
        onClick={() => {
          const result = window.confirm('Do you really want to clear the board?');
          if (result) {
            clearBoard();
          }
        }}
      >
        Clear board
      </ClearBoardButton>

      <ClearBoardButton
        onClick={() => {
          const result = window.prompt('Please enter your grid size', '9,50');
          if (result) {
            const rows = Number(result.split(',')[1]);
            const columns = Number(result.split(',')[0]);
            createNewBoard(rows, columns);
          }
        }}
      >
        Set grid size
      </ClearBoardButton>
    </EditorToolsContainer>
  );
};

const StyledSketchPicker = styled(SketchPicker)``;

const ClearBoardButton = styled.button`
  margin: 8px auto;
  border: none;
  color: white;
  font-weight: 700;
  padding: 8px;
  background-color: #e67e22;
`;

const Tools = styled.div`
  display: flex;
`;

const StyledIcon = styled(FontAwesomeIcon)<{ isDrawing: boolean }>`
  color: ${({ isDrawing }) => (isDrawing ? '#3498db' : 'black')};
  margin: 8px;
`;

const StyledIconAlt = styled(FontAwesomeIcon)`
  margin: 8px;
`;

const EditorToolsContainer = styled.div`
  position: absolute;
  top: 20%;
  right: 0;
  margin: 0;
  background-color: #ecf0f1;
  height: 500px;
  padding: 8px;
  border-bottom-left-radius: 12px;
  border-top-left-radius: 12px;
  display: flex;
  flex-direction: column;
  @media print {
     {
      display: none !important;
    }
  }
`;

export default EditorTools;
