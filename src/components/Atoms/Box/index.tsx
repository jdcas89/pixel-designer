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
}

const Box: React.FC<BoxProps> = ({ onPixelClicked, pixel, chosenColor }) => {
  const { isDrawing } = useContext(ToolsContext);
  const [checkedState, setCheckedState] = useState(pixel.checked);
  const [colorState, setColorState] = useState(pixel.color);

  useEffect(() => {
    setCheckedState(pixel.checked);
    setColorState(pixel.color);
  }, [pixel]);

  const onPixelClickedHandler = () => {
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
  };
  const handleOnMouseOver = (event) => {
    if (event.buttons === 1 || event.buttons === 3) {
      onPixelClickedHandler();
    }
  };

  return (
    <BoxContainer
      onMouseDown={() => {
        onPixelClickedHandler();
      }}
      onMouseEnter={handleOnMouseOver}
      color={colorState}
      checked={checkedState}
    />
  );
};

const BoxContainer = styled.div<{ checked: boolean; color?: string }>`
  height: 20px;
  width: 20px;
  border: 1px solid black;
  margin: 0.5px;
  border-radius: 2px;
  cursor: pointer;
  background-color: ${({ checked, color }) => (checked ? color : 'white')};
`;

export default Box;
