import React, {Component} from 'react';
import T from 'prop-types';
import {classes} from '../utils';

export class DefOption extends Component {
  static propTypes = {
    checked: T.bool.isRequired,
    option: T.object.isRequired,
    disabled: T.bool,
    onClick: T.func,
    mode: T.string,
  };

  render() {
    const {checked, option, onClick, disabled, mode} = this.props;

    return (
      <div className="Option__renderer">
        <span className={classes('Option__label', {'Option--labelDisabled': disabled})}>
          {option.label}
        </span>
        <input
          style={{visibility: mode === 'single' ? 'hidden' : 'visible'}}
          type="checkbox"
          checked={checked}
          tabIndex="-1"
          disabled={disabled}
          onChange={onClick}
        />
      </div>
    );
  }
}
