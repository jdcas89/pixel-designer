import * as CSS from 'csstype';

export interface ThemeColors {
  primary: CSS.ColorProperty;
  link: CSS.ColorProperty;
  success: CSS.ColorProperty;
  warning: CSS.ColorProperty;
  error: CSS.ColorProperty;
  heading: CSS.ColorProperty;
  text: CSS.ColorProperty;
  disabled: CSS.ColorProperty;
  border: CSS.ColorProperty;
}

// sync this with overrides.less
export const colors: ThemeColors = {
  primary: '#373981',
  link: '#1890ff',
  success: '#52c41a',
  warning: '#faad14',
  error: '#e84118',
  heading: '#000',
  text: '#000',
  disabled: '#f5222d',
  border: '#000',
};
