import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';
import style from './Button.scss';
import * as constants from './constants';
import { buttonSizes, buttonThemes, buttonVariants } from './constants';

export type ButtonProps = MuiButtonProps & {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  loadingAndDisabled?: boolean;
  className?: string;
  theme?: typeof constants.buttonThemes[keyof typeof constants.buttonThemes];
  variant?: typeof constants.buttonVariants[keyof typeof constants.buttonVariants];
  size?: typeof constants.buttonSizes[keyof typeof constants.buttonSizes];
  classes?: { root?: string; disabled?: string; outlined?: string; text?: string };
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  loadingAndDisabled,
  theme = buttonThemes.THEME_1,
  className = '',
  variant = buttonVariants.CONTAINED,
  size = buttonSizes.MEDIUM,
  classes = {},
  ...restProps
}) => (
  <MuiButton
    variant={variant}
    size={size}
    classes={{
      ...classes,
      root: `shared-component-button ${className} ${theme} ${classes.root || ''}`,
      disabled: `shared-component-disabled ${classes.disabled || ''}`,
      outlined: `shared-components-button-outlined ${classes.outlined || ''}`,
      text: `shared-components-button-text ${classes.text || ''}`,
    }}
    disabled={loadingAndDisabled || disabled}
    {...restProps}
  >
    {loadingAndDisabled || loading ? (
      <>
        <div style={{ visibility: 'hidden' }}>{children}</div>
        <CircularProgress className="shared-component-button-loading" size={24} color="inherit" />
      </>
    ) : (
      children
    )}
  </MuiButton>
);

// @ts-ignore
export default withStyles(style)(Button);
