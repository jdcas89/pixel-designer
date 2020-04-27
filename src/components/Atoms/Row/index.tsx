import React, { useContext } from 'react';
import Box from '../Box';
import styled from 'styled-components';
import { Pixel, RowType } from '../../../utils/grid-example';
import { BoardContext } from '../../../contexts/BoardContext';

const Row: React.FC<{ row: RowType; chosenColor: string; isNumberRow?: boolean }> = ({
  row,
  chosenColor,
  isNumberRow,
}) => {
  const { updateBoard, pixelSize } = useContext(BoardContext);
  const sortPixels = (a: Pixel, b: Pixel) => {
    return a.x > b.x ? -1 : 1;
  };

  return (
    <RowContainer>
      {row.sort(sortPixels).map((pixel, i) => (
        <CenteredContainer key={i}>
          {i === 0 && <StyledSpan>{pixel.y}</StyledSpan>}
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
            key={i}
          >
            {isNumberRow && pixel.x}
          </Box>
        </CenteredContainer>
      ))}
    </RowContainer>
  );
};

const StyledSpan = styled.span`
  text-align: right;
  padding: 0 2px;
  width: 20px;
`;

const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RowContainer = styled.div`
  display: flex;
  position: relative;
`;

export default Row;
