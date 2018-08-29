import React from 'react';

export const DefCounter = ({valuePlaceholder, counterLabel, value, options}) => (
  <span>
    {!!value.length ? counterLabel || valuePlaceholder : valuePlaceholder}
    {!!value.length && (
      <span className="DropDown__counter">
        {' '}
        ({value.length === options.length ? 'All' : value.length})
      </span>
    )}
  </span>
);
