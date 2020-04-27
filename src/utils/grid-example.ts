export interface Pixel {
  x: number;
  y: number;
  checked: boolean;
  color?: string;
}

export type RowType = Pixel[];

const gridExample: RowType[] = [
  [
    { x: 0, y: 0, checked: true, color: 'green' },
    { x: 0, y: 1, checked: false, color: 'black' },
    { x: 0, y: 2, checked: false, color: 'black' },
  ],
  [
    { x: 1, y: 0, checked: false, color: 'black' },
    { x: 1, y: 1, checked: false, color: 'black' },
  ],
  [
    { x: 2, y: 0, checked: true, color: 'black' },
    { x: 2, y: 1, checked: false, color: 'black' },
  ],
];
