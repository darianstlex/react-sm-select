import React from 'react';

export const Counter = ({valuePlaceholder, counterLabel, value, options}) => (
  <span>
    {!!value.length ? counterLabel || valuePlaceholder : valuePlaceholder}
    {!!value.length && (
      <span className="Header__valueCounter">
        ({value.length === options.length ? 'All' : value.length})
      </span>
    )}
  </span>
);
