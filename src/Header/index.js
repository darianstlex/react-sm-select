import React from 'react';
import { classes } from '../utils';

export { Value } from './Value';
export { DefArrow } from './DefArrow';
export { DefLoading } from './DefLoading';

export const Header = ({ children, disabled, expanded, focused, selected, nodeRef, onClick }) => (
  <div
    className={classes('Header', {
      'Header--focusedActive':  !disabled && (focused || expanded),
      'Header--expanded': expanded,
      'Header--disabled': disabled,
      'Header--focusedDisabled': disabled && focused,
      'Header--selected': !disabled && (focused && selected)
    })}
    tabIndex="0"
    role="combobox"
    aria-expanded={expanded}
    aria-readonly="true"
    aria-disabled={disabled}
    ref={nodeRef}
    onClick={onClick}
  >
    {children}
  </div>
);

