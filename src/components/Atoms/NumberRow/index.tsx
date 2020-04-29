import React, { useContext } from 'react';
import { RowType } from '../../../utils/grid-example';
import styled from 'styled-components';
import { BoardContext } from '../../../contexts/BoardContext';

interface NumberRowProps {
  row: RowType;
}
const NumberRow: React.FC<NumberRowProps> = ({ row }) => {
  const { pixelSize, boardPattern } = useContext(BoardContext);

  return (
    <NumberRowContainer pixelSize={pixelSize} boardPattern={boardPattern}>
      {row.map((pixel) => (
        <StyledSpan pixelSize={pixelSize} key={pixel.x + pixel.y}>
          {pixel.x + 1}
        </StyledSpan>
      ))}
    </NumberRowContainer>
  );
};

const NumberRowContainer = styled.div<{ pixelSize: number; boardPattern: string }>`
  display: flex;
`;

const StyledSpan = styled.span<{ pixelSize: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ pixelSize }) => (pixelSize ? pixelSize : '20')}px;
  height: ${({ pixelSize }) => (pixelSize ? pixelSize : '20')}px;
  margin: 0.5px;
  &:first-child {
    margin: 0 0 0 ${({ pixelSize }) => Number(pixelSize) + 1}px;
  }
  font-size: 14px;
`;

export default NumberRow;
