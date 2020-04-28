import React, { useContext } from 'react';
import Box from '../Box';
import styled from 'styled-components';
import { Pixel, RowType } from '../../../utils/grid-example';
import { BoardContext } from '../../../contexts/BoardContext';

const Row: React.FC<{ row: RowType; chosenColor: string }> = ({ row, chosenColor }) => {
  const { updateBoard, pixelSize } = useContext(BoardContext);
  const sortPixels = (a: Pixel, b: Pixel) => {
    return a.x < b.x ? -1 : 1;
  };

  return (
    <RowContainer pixelSize={pixelSize}>
      {row.sort(sortPixels).map((pixel, i) => (
        <CenteredContainer key={i}>
          {i === 0 && <StyledSpan pixelSize={pixelSize}>{pixel.y}</StyledSpan>}
          <Box
            pixelSize={pixelSize}
            pixel={pixel}
            checked={pixel.checked}
            color={pixel.color}
            chosenColor={chosenColor}
            onPixelClicked={(pixel) => {
              if (updateBoard) {
                updateBoard(pixel);
              }
            }}
            key={pixel.x + pixel.y}
          />
        </CenteredContainer>
      ))}
    </RowContainer>
  );
};

const StyledSpan = styled.span<{ pixelSize: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2px;
  width: ${({ pixelSize }) => pixelSize}px;
  user-select: none;
  font-size: 14px;
`;

const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RowContainer = styled.div<{ pixelSize: number }>`
  display: flex;
  position: relative;
  margin: 0.5px;
  height: ${({ pixelSize }) => pixelSize}px;
`;

export default Row;
