import React from 'react';

export const DefCounter = ({valuePlaceholder, value, options}) => (
  <span>
    {valuePlaceholder}
    {!!value.length && (
      <span className="DropDown__counter">
        {' '}
        ({value.length === options.length ? 'All' : value.length})
      </span>
    )}
  </span>
);
