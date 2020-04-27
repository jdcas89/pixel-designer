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
  setPixelSize: (pixelSize: number) => void;
}

const EditorTools: React.FC<EditorToolsProps> = ({
  handleChangeColor,
  chosenColor,
  isDrawing,
  setIsDrawing,
  clearBoard,
  createNewBoard,
  setPixelSize,
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
          handleChangeColor(color);
        }}
      />
      <Text>Color settings</Text>
      <ButtonsContainer>
        <ClearBoardButton
          onClick={() => {
            setColorPalette((prevState) => [...prevState, chosenColor]);
          }}
        >
          Add color to palette
        </ClearBoardButton>
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
      </ButtonsContainer>

      <Text>Board settings</Text>
      <ButtonsContainer>
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
            const result = window.prompt('Please enter your pixel size', '20');
            if (result) {
              const pixelSize = Number(result);
              setPixelSize(pixelSize);
            }
          }}
        >
          Set pixel size
        </ClearBoardButton>
        <ClearBoardButton
          onClick={() => {
            const result = window.prompt('Please enter your grid size', '9,50');
            if (result) {
              const rows = Number(result.split(',')[0]);
              const columns = Number(result.split(',')[1]);
              createNewBoard(rows, columns);
            }
          }}
        >
          Set grid size
        </ClearBoardButton>
      </ButtonsContainer>
    </EditorToolsContainer>
  );
};

const Text = styled.p`
  padding: 8px;
  margin: 8px auto;
  font-weight: 700;
`;
const StyledSketchPicker = styled(SketchPicker)``;

const ButtonsContainer = styled.div`
  display: grid;
  padding: 0;
  grid-gap: 8px;
  grid-template-columns: 1fr 1fr;
`;
const ClearBoardButton = styled.button`
  margin: 0 auto;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: none;
  color: white;
  font-weight: 700;
  padding: 8px;
  background-color: #3498db;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
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
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  right: 0;
  background-color: #ecf0f1;
  height: 100vh;
  padding: 8px;
  //margin: 0 16px;
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
