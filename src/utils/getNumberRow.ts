import { RowType } from './grid-example';

export const getNumberRow: (row: RowType) => RowType = (row) => {
  return row.map((p) => {
    p.y = -1;
    p.checked = false;
    p.color = 'white';
    return p;
  });
};
