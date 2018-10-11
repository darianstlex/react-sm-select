import React from 'react';

import { MODE } from '../../consts';

import { Counter } from './Counter';
import { DefValue } from './DefValue';
import { DefTag } from './DefTag';

export const Value = ({
  mode,
  options,
  value,
  Value = DefValue,
  Tag = DefTag,
  valuePlaceholder,
  allSelectedLabel,
  counterLabel,
  onRemove,
  removableTag,
}) => {
  const isMode = expected => mode === expected;

  if (Value === DefValue && !isMode(MODE.TAGS) && !isMode(MODE.COUNTER) && value.length === options.length)
    return (<span>{allSelectedLabel}</span>);

  if (!value.length) return (<span className="Header__valuePlaceholder">{valuePlaceholder}</span>);

  if (isMode(MODE.TAGS)) {
    const labels = value.map(val => options.find(opt => opt.value === val).label);
    return (
      <div className="Header__tags">
        {labels.map((label, index) => (
          <Tag
            key={index}
            label={label}
            index={index}
            onTagRemove={onRemove}
            removableTag={removableTag}
          />
        ))}
      </div>
    );
  }
  if (isMode(MODE.COUNTER)) return (
    <Counter
      value={value}
      options={options}
      counterLabel={counterLabel}
      valuePlaceholder={valuePlaceholder}
    />
  );

  return (<Value options={options} value={value} />);
};
