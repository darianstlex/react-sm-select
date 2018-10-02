import React from 'react';

export const DefTag = ({label, index, removableTag, onTagRemove}) => (
  <div className="Header__tag">
    <div className="Header__tag__label">{label}</div>
    {removableTag && <div className="Header__tag__close" onClick={event => onTagRemove(index, event)}>✕</div>}
  </div>
);
