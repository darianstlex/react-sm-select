import React, {Component} from 'react';
import T from 'prop-types';

import {SelectItem} from './SelectItem';

export class SelectList extends Component {
  static displayName = 'SelectList';
  static propTypes = {
    focusIndex: T.number.isRequired,
    OptionRenderer: T.func,
    options: T.array.isRequired,
    value: T.array.isRequired,
    onChange: T.func.isRequired,
    onClick: T.func.isRequired,
    disabled: T.bool,
    singleSelect: T.bool,
    closePanel: T.func.isRequired,
  };

  onChange = (option, checked) => {
    const {value, onChange, disabled, singleSelect, closePanel} = this.props;

    if (disabled) return;
    if (singleSelect) {
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

  renderItems = () => {
    const {
      OptionRenderer,
      options,
      value,
      focusIndex,
      onClick,
      disabled,
      singleSelect,
    } = this.props;

    return options.map((option, idx) => (
      <li className="SelectList__item" key={option.hasOwnProperty('key') ? option.key : idx}>
        <SelectItem
          focused={focusIndex === idx}
          option={option}
          onChange={event => this.onChange(option, event)}
          checked={value.includes(option.value)}
          onClick={event => onClick(event, idx)}
          OptionRenderer={OptionRenderer}
          disabled={disabled}
          singleSelect={singleSelect}
        />
      </li>
    ));
  };

  render() {
    return (
      <ul className="SelectList">
        {this.renderItems()}
      </ul>
    );
  }
}
