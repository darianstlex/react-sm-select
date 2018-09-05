import React from 'react';

export const DefOption = ({checked, option, isSingle}) => (
  <div className="Option__renderer">
    <span className="Option__label">
      {option.label}
    </span>
    {!isSingle && <input
      type="checkbox"
      defaultChecked={checked}
      tabIndex="-1"
    />}
  </div>
);
