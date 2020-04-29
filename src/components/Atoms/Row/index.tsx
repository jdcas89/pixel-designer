import React, { Fragment, useContext } from 'react';
import Box from '../Box';
import styled from 'styled-components';
import { Pixel, RowType } from '../../../utils/grid-example';
import { BoardContext } from '../../../contexts/BoardContext';

const Row: React.FC<{ row: RowType; chosenColor: string; index: number }> = ({ row, chosenColor, index }) => {
  const { updateBoard, pixelSize, boardPattern } = useContext(BoardContext);
  const sortPixels = (a: Pixel, b: Pixel) => {
    return a.x < b.x ? -1 : 1;
  };

  return (
    <RowContainer pixelSize={pixelSize}>
      <StyledSpan pixelSize={pixelSize}>{index + 1}</StyledSpan>
      <InnerRowContainer pixelSize={pixelSize} boardPattern={boardPattern} index={index}>
        {row.sort(sortPixels).map((pixel, i) => (
          <Fragment key={pixel.x + pixel.y}>
            <CenteredContainer key={i}>
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
          </Fragment>
        ))}
      </InnerRowContainer>
    </RowContainer>
  );
};

const InnerRowContainer = styled.div<{ index: number; boardPattern: string; pixelSize: number }>`
  display: flex;
  margin: ${({ index, boardPattern, pixelSize }) => {
    if (boardPattern === 'peyote') {
      return index % 2 === 0 ? `0.5px 0.5px 0.5px ${pixelSize / 2 + 0.5}px` : '0.5px';
    }
    return '0.5px';
  }};
`;

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
