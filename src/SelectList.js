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
    onSelectedChanged: T.func.isRequired,
    onClick: T.func.isRequired,
    disabled: T.bool,
    singleSelect: T.bool,
    closePanel: T.func.isRequired,
  };

  handleSelectionChanged = (option, checked) => {
    const {value, onSelectedChanged, disabled, singleSelect, closePanel} = this.props;

    if (disabled) return;
    if (singleSelect) {
      onSelectedChanged([option.value]);
      closePanel();
      return;
    }
    if (checked) onSelectedChanged([...value, option.value]);
    else {
      const index = value.indexOf(option.value);
      const removed = [
        ...value.slice(0, index),
        ...value.slice(index + 1),
      ];
      onSelectedChanged(removed);
    }
  };

  renderItems() {
    const {
      OptionRenderer,
      options,
      value,
      focusIndex,
      onClick,
      disabled,
      singleSelect,
    } = this.props;

    return options.map((o, i) => (
      <li className="SelectList__item" key={o.hasOwnProperty('key') ? o.key : i}>
        <SelectItem
          focused={focusIndex === i}
          option={o}
          onSelectionChanged={c => this.handleSelectionChanged(o, c)}
          checked={value.includes(o.value)}
          onClick={e => onClick(e, i)}
          OptionRenderer={OptionRenderer}
          disabled={disabled}
          singleSelect={singleSelect}
        />
      </li>
    ));
  }

  render() {
    return (
      <ul className="SelectList">
        {this.renderItems()}
      </ul>
    );
  }
}
