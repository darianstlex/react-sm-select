import React, {Component} from 'react';
import T from 'prop-types';
import {classes} from '../utils';

export class DefOption extends Component {
  static propTypes = {
    checked: T.bool.isRequired,
    option: T.object.isRequired,
    disabled: T.bool,
    onClick: T.func,
    isSingle: T.bool,
  };

  render() {
    const {checked, option, onClick, disabled, isSingle} = this.props;

    return (
      <div className="Option__renderer" onMouseDown={onClick}>
        <span className={classes('Option__label', {'Option--labelDisabled': disabled})}>
          {option.label}
        </span>
        {!isSingle && <input
          type="checkbox"
          checked={checked}
          tabIndex="-1"
          disabled={disabled}
          onChange={() => {}}
        />}
      </div>
    );
  }
}
