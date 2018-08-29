import React from 'react';
import T from 'prop-types';

import {Option} from './Option';

export class OptionList extends React.Component {
  static displayName = 'OptionList';
  static propTypes = {
    focusIndex: T.number.isRequired,
    OptionRenderer: T.func,
    options: T.array.isRequired,
    value: T.array.isRequired,
    onChange: T.func.isRequired,
    onClick: T.func.isRequired,
    disabled: T.bool,
    isSingle: T.bool,
    closePanel: T.func.isRequired,
  };

  onChange = (option, checked) => {
    const {value, onChange, disabled, isSingle, closePanel} = this.props;

    if (disabled) return;
    if (isSingle) {
      onChange([option.value]);
      closePanel();
      return;
    }
    if (checked) onChange([...value, option.value]);
    else {
      const index = value.indexOf(option.value);
      const removed = [
        ...value.slice(0, index),
        ...value.slice(index + 1),
      ];
      onChange(removed);
    }
  };

  render() {
    const {props: p} = this;
    return (
      <ul className="OptionList">
        {p.options.map((option, idx) => (
          <li className="OptionList__item"
            key={option.hasOwnProperty('key') ? option.key : idx}>
            <Option
              focused={p.focusIndex === idx}
              option={option}
              onChange={event => this.onChange(option, event)}
              checked={p.value.includes(option.value)}
              onClick={event => p.onClick(event, idx)}
              OptionRenderer={p.OptionRenderer}
              disabled={p.disabled}
              isSingle={p.isSingle}
            />
          </li>
        ))}
      </ul>
    );
  }
}
