import Typography from 'typography';
import stowLakeTheme from 'typography-theme-stow-lake';

export const fonts = {
  heading: 'Prompt',
  body: 'Nunito',
};

const typography = new Typography({
  baseFontSize: '16px',
  headerFontFamily: [fonts.heading],
  bodyFontFamily: [fonts.body],
  ...stowLakeTheme,
});

if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
