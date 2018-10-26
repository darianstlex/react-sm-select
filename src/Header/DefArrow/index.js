import React from 'react';
import { classes } from '../../utils';

export const DefArrow = ({expanded, disabled}) => (
  <div className="Header__arrow">
    <div
      className={classes({
        'Header__arrow--down': !expanded,
        'Header__arrow--up': expanded,
        'Header__arrow--active': !disabled && expanded,
        'Header__arrow--disabled': disabled,
      })}
    />
  </div>
);
