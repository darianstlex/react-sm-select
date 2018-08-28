import React from 'react';

export const DefTag = ({label, index, removableTag, onTagRemove}) => (
  <div className="MultiSelect__tag">
    <div className="MultiSelect__tag__label">{label}</div>
    {removableTag && <div className="MultiSelect__tag__close" onClick={event => onTagRemove(index, event)}>✕</div>}
  </div>
);
