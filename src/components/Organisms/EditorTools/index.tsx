import React, { Dispatch, SetStateAction } from 'react';
import { faCaretCircleRight, faCog, faEraser, faPen, faTint } from '@fortawesome/pro-solid-svg-icons';
import { ColorChangeHandler, SketchPicker } from 'react-color';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

      <SketchPicker color={chosenColor} onChangeComplete={handleChangeColor} />
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
`;

export default EditorTools;
