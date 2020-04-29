import { RowType } from './grid-example';

export const createGrid: (columns: number, rows: number, gridType?: string) => RowType[] = (rows, columns) => {
  const grid: RowType[] = [];

  for (let i = 0; i < rows; i++) {
    const row: RowType = [];

    for (let j = 0; j < columns; j++) {
      row.push({ x: j, y: i, checked: false, color: '#fff' });
    }
    grid.push(row);
  }

  return grid;
};
