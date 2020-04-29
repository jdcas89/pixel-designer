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

const Box: React.FC<BoxProps> = ({ onPixelClicked, pixel, chosenColor, pixelSize }) => {
  const { currentTool, setCurrentColor } = useContext(ToolsContext);
  const [checkedState, setCheckedState] = useState(pixel.checked);
  const [colorState, setColorState] = useState(pixel.color);

  useEffect(() => {
    setCheckedState(pixel.checked);
    setColorState(pixel.color);
  }, [pixel]);

  const onPixelClickedHandler = () => {
    if (currentTool === 'pen') {
      setColorState(chosenColor);
      setCheckedState(true);
      onPixelClicked({
        ...pixel,
        checked: true,
        color: chosenColor,
      });
    } else if (currentTool === 'eyedropper') {
      if (setCurrentColor && colorState) {
        setCurrentColor(colorState);
      }
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
      pixelSize={pixelSize}
      onMouseEnter={handleOnMouseOver}
      color={colorState}
      checked={checkedState}
    >
      <ToolTip>
        <span className="tooltiptext">
          X: {pixel.x + 1}, Y:{pixel.y + 1}
        </span>
      </ToolTip>
    </BoxContainer>
  );
};

const ToolTip = styled.div`
  visibility: hidden;
  position: relative;
  background-color: #8e44ad;
  color: #fff;
  text-align: center;
  padding: 8px 4px;
  height: 28px;
  border-radius: 6px;
  margin: 0 -48px;
  font-weight: 700;
  top: -40px;
  font-size: 14px;
  z-index: 1;
  &:hover {
    visibility: visible;
  }
`;

const BoxContainer = styled.div<{ checked: boolean; color?: string; pixelSize: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ pixelSize }) => pixelSize}px;
  width: ${({ pixelSize }) => pixelSize}px;
  border: 0.5px solid #00000088;
  margin: 0.5px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ checked, color }) => (checked ? color : 'white')};
  user-select: none;
  &:hover ${ToolTip} {
    visibility: visible;
  }
`;

export default Box;
