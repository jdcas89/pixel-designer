import Typography from 'typography';
import stowLakeTheme from 'typography-theme-stow-lake';

export const fonts = {
  heading: 'Prompt',
  body: 'Nunito',
};

const typography = new Typography({
  baseFontSize: '16px',
  // baseLineHeight: 1.55,
  // headerLineHeight: 1.4,
  headerFontFamily: [fonts.heading],
  bodyFontFamily: [fonts.body],
  ...stowLakeTheme,
});
// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
