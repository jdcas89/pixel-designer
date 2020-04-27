import React, { useContext } from 'react';
import Box from '../Box';
import styled from 'styled-components';
import { Pixel, RowType } from '../../../utils/grid-example';
import { BoardContext } from '../../../contexts/BoardContext';

const Row: React.FC<{ row: RowType; chosenColor: string }> = ({ row, chosenColor }) => {
  const { updateBoard, pixelSize } = useContext(BoardContext);
  const sortPixels = (a: Pixel, b: Pixel) => {
    return a.x > b.x ? -1 : 1;
  };

  return (
    <RowContainer>
      {row.sort(sortPixels).map((pixel, i) => (
        <>
          {i === 0 && <span style={{ padding: '0 2px' }}>{pixel.y}</span>}
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
          />
          {/*<span>{pixel.x}</span>*/}
        </>
      ))}
    </RowContainer>
  );
};

const RowContainer = styled.div`
  display: flex;
  position: relative;
`;

export default Row;
