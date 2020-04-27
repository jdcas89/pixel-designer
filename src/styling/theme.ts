import { colors, ThemeColors } from './colors';
import { generateMedia } from 'styled-media-query';

export interface Space {
  NONE: number;
  XS: number;
  S: number;
  M: number;
  L: number;
  XL: number;
  XXL: number;
}

export const space: Space = {
  NONE: 0,
  XS: 2,
  S: 4,
  M: 8,
  L: 16,
  XL: 32,
  XXL: 64,
};

interface BreakPoints {
  desktop: string;
  tablet: string;
  largeMobile: string;
  mediumMobile: string;
  smallMobile: string;
}

export const mq = generateMedia<BreakPoints>({
  desktop: '1023px',
  tablet: '767px',
  largeMobile: '412px',
  mediumMobile: '376px',
  smallMobile: '321px',
});

export const mediumMobile = mq.between('smallMobile', 'mediumMobile');
export const largeMobile = mq.between('mediumMobile', 'tablet');
export const tablet = mq.between('tablet', 'desktop');
export const desktop = mq.greaterThan('desktop');
export const tabletAndUp = mq.greaterThan('tablet');
export const largeMobileAndUp = mq.greaterThan('largeMobile');

export const breakpoints: string[] = ['321px', '376px', '412px'];

export type CustomTheme = {
  breakpoints: string[];
  colors: ThemeColors;
  space: Space;
};
export const defaultTheme: CustomTheme = {
  space: {
    ...space,
  },
  breakpoints,
  colors: {
    ...colors,
  },
};
