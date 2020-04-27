import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { largeMobile, mediumMobile } from '../../../styling/theme';

interface ButtonProps {
  buttonTheme?: string;
  disabled?: boolean;
  fluid?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => (
  <StyledButton {...props} buttonTheme={props.buttonTheme} disabled={props.disabled} onClick={props.onClick}>
    <p>{props.children}</p>
  </StyledButton>
);

const StyledButton = styled.button<ButtonProps>`
  background-color: ${({ theme, buttonTheme }) => (buttonTheme === 'primary' ? theme.colors.primary : 'white')};
  border: ${({ buttonTheme, theme }) => (buttonTheme === 'primary' ? 'none' : `2px solid ${theme.colors.primary}`)};
  height: 48px;
  width: 280px;
  color: ${({ theme, buttonTheme }) => (buttonTheme === 'primary' ? 'white' : theme.colors.primary)};
  border-radius: 30px;
  padding: 8px 16px;
  margin: 8px auto;
  ${mediumMobile`
   height: 56px;
  `};
  ${largeMobile`
   height: 56px;
  `};
`;

export default Button;
