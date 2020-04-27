import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ToolsContext } from '../../../contexts/ToolsContext';
import { Pixel } from '../../../utils/grid-example';

interface BoxProps {
  onPixelClicked: (pixel: Pixel) => void;
  color?: string;
  chosenColor: string;
  checked: boolean;
  pixel: Pixel;
  pixelSize: number;
}

const Box: React.FC<BoxProps> = ({ onPixelClicked, pixel, chosenColor, pixelSize, children }) => {
  const { isDrawing } = useContext(ToolsContext);
  const [checkedState, setCheckedState] = useState(pixel.checked);
  const [colorState, setColorState] = useState(pixel.color);
  useEffect(() => {
    setCheckedState(pixel.checked);
    setColorState(pixel.color);
  }, [pixel]);

  const onPixelClickedHandler = () => {
    if (!children) {
      if (isDrawing) {
        setColorState(chosenColor);
        setCheckedState(true);
        onPixelClicked({
          ...pixel,
          checked: true,
          color: chosenColor,
        });
      } else {
        setColorState('#fff');
        setCheckedState(false);
        onPixelClicked({
          ...pixel,
          checked: false,
          color: '#fff',
        });
      }
    }
  };
  const handleOnMouseOver = (event) => {
    if (event.buttons === 1 || event.buttons === 3) {
      onPixelClickedHandler();
    }
  };

  return (
    <BoxContainer
      isNumberRow={!!children}
      onMouseDown={() => {
        onPixelClickedHandler();
      }}
      pixelSize={pixelSize}
      onMouseEnter={handleOnMouseOver}
      color={colorState}
      checked={checkedState}
    >
      {children}
    </BoxContainer>
  );
};

const BoxContainer = styled.div<{ checked: boolean; color?: string; pixelSize: number; isNumberRow?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ pixelSize }) => pixelSize}px;
  width: ${({ pixelSize }) => pixelSize}px;
  border: ${({ isNumberRow }) => !isNumberRow && '0.5px solid #00000088'};
  margin: ${({ isNumberRow }) => (!isNumberRow ? '0.5px' : '1px')};
  border-radius: 2px;
  cursor: pointer;
  background-color: ${({ checked, color }) => (checked ? color : 'white')};
`;

export default Box;
