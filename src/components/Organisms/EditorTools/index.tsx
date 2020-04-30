import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { faCaretCircleRight, faEraser, faPen } from '@fortawesome/pro-solid-svg-icons';
import { ColorChangeHandler, ColorResult, SketchPicker } from 'react-color';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useLocalStorage from '../../../utils/useLocalStorage';
import { faEyeDropper } from '@fortawesome/pro-light-svg-icons';
import { BoardContext } from '../../../contexts/BoardContext';
import uniqueId from 'uniqid';

export type ToolType = 'eraser' | 'pen' | 'eyedropper';

const getColor = (activeTool: string, tool: string) => {
  return tool === activeTool ? '#3498db' : 'black';
};

interface EditorToolsProps {
  chosenColor: string;
  handleChangeColor: ColorChangeHandler;
  currentTool: ToolType;
  setCurrentTool: Dispatch<SetStateAction<ToolType>>;
  clearBoard: () => void;
  createNewBoard: (rows: number, columns: number) => void;
  setPixelSize: (pixelSize: number) => void;
  setBoardPattern: (boardPattern: string) => void;
  boardPattern: string;
}

const EditorTools: React.FC<EditorToolsProps> = ({
  handleChangeColor,
  chosenColor,
  currentTool,
  clearBoard,
  createNewBoard,
  setPixelSize,
  setCurrentTool,
  setBoardPattern,
  boardPattern,
}) => {
  const { board, setBoard } = useContext(BoardContext);
  const [savedColorPalette, setSavedColorPalette] = useLocalStorage(
    'pixel-designer-saved-color-palette',
    JSON.stringify(['#000', '#fff'])
  );

  const download = (content, fileName, contentType) => {
    const anchorElement = document.createElement('a');

    const file = new Blob([content], { type: contentType });

    anchorElement.href = URL.createObjectURL(file);
    anchorElement.download = fileName;
    anchorElement.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = event.target.files;
    if (files && files.length > 0) {
      let file = files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        if (e && e.target && e.target.result && typeof e.target.result === 'string') {
          const importedBoard = JSON.parse(e.target.result);
          if (importedBoard && setBoard) {
            setBoard(importedBoard);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const [colorPalette, setColorPalette] = useState(JSON.parse(savedColorPalette));
  return (
    <EditorToolsContainer>
      <Tools>
        <StyledIcon
          color={getColor(currentTool, 'pen')}
          icon={faPen}
          onClick={() => {
            setCurrentTool('pen');
          }}
        />
        <StyledIcon
          color={getColor(currentTool, 'eraser')}
          icon={faEraser}
          onClick={() => {
            setCurrentTool('eraser');
          }}
        />
        <StyledIcon
          color={getColor(currentTool, 'eyedropper')}
          onClick={() => {
            setCurrentTool('eyedropper');
          }}
          icon={faEyeDropper}
        />
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
        <Button
          onClick={() => {
            setColorPalette((prevState) => [...prevState, chosenColor]);
          }}
        >
          Save color
        </Button>
        <Button
          onClick={() => {
            setSavedColorPalette(JSON.stringify(colorPalette));
          }}
        >
          Save palette
        </Button>
        <Button
          onClick={() => {
            setColorPalette(['#000', '#fff']);
            setSavedColorPalette(JSON.stringify(['#000', '#fff']));
          }}
        >
          Clear palette
        </Button>
      </ButtonsContainer>

      <Text>Board settings</Text>
      <ButtonsContainer>
        <Button
          onClick={() => {
            const result = window.confirm('Do you really want to clear the board?');
            if (result) {
              clearBoard();
            }
          }}
        >
          Clear board
        </Button>

        <Button
          onClick={() => {
            const result = window.prompt('Please enter your pixel size', '20');
            if (result) {
              const pixelSize = Number(result);
              setPixelSize(pixelSize);
            }
          }}
        >
          Pixel Size
        </Button>
        <Button
          onClick={() => {
            const result = window.prompt('Please enter your grid size', '9,50');
            if (result) {
              const rows = Number(result.split(',')[0]);
              const columns = Number(result.split(',')[1]);
              createNewBoard(rows, columns);
            }
          }}
        >
          Grid size
        </Button>
      </ButtonsContainer>

      <Text>Board Pattern</Text>
      <Button
        onClick={() => {
          setBoardPattern(boardPattern === 'square' ? 'peyote' : 'square');
        }}
      >
        {boardPattern === 'square' ? 'Peyote' : 'Square'}
      </Button>

      <br />
      <Button
        onClick={() => {
          download(JSON.stringify(board), `pixel-designer-${uniqueId()}.json`, 'text/plain');
        }}
      >
        Export design
      </Button>
      <br />
      <Button
        onClick={() => {
          const uploadInput = document.getElementById('uploadFile');
          if (uploadInput) {
            uploadInput.click();
          }
        }}
      >
        Import design
      </Button>
      <br />
      <StyledUploadInput type="file" id="uploadFile" onChange={onChangeHandler} />

      <Version>Version 0.1.0</Version>
    </EditorToolsContainer>
  );
};

const StyledUploadInput = styled.input`
  display: none;
`;

const Version = styled.p`
  margin: 32px 0;
  align-self: flex-end;
  font-size: 12px;
`;

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
const Button = styled.button`
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
  font-size: 14px;
`;

const Tools = styled.div`
  display: flex;
`;

const StyledIcon = styled(FontAwesomeIcon)`
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
  padding: 16px;
  display: flex;
  flex-direction: column;
  @media print {
     {
      display: none !important;
    }
  }
`;

export default EditorTools;
