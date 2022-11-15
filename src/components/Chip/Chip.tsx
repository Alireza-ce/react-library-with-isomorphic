import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Chip.scss';

export type ChipProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  label: string;
  disabled?: boolean;
  selected?: boolean;
  className?: string;
};

const Chip: React.FC<ChipProps> = ({ label, className = '', disabled, selected, ...restProps }) => (
  <div {...restProps} className={`chip-container ${className} ${disabled ? 'disabled' : ''} ${selected ? 'selected' : ''}`}>
    {label}
  </div>
);

export default withStyles(s)(Chip);
