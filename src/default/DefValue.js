import React from 'react';

export const DefValue = ({value, options}) => {
  return (<span className="DropDown__value">{value.map(val => options.find(opt => opt.value === val).label).join(', ')}</span>);
};
