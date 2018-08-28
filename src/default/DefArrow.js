import React from 'react';
import {classes} from '../utils';

export const DefArrow = ({expanded}) => (
  <div className="DropDown__arrow">
    <div
      className={classes({
        'DropDown__arrow--up': expanded,
        'DropDown__arrow--down': !expanded,
      })}
    />
  </div>
);
