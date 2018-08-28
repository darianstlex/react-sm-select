import React from 'react';

export const DefValue = ({value, options}) => {
  return (<span>{value.map(val => options.find(opt => opt.value === val).label).join(', ')}</span>);
};
