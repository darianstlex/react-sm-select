import React from 'react';
import { classes } from '../utils';

import { Value } from './Value';
import { DefArrow } from './DefArrow';
import { DefLoading } from './DefLoading';

export { Value, DefArrow, DefLoading };

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

