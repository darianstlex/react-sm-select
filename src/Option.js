import React from 'react';
import T from 'prop-types';
import {classes} from './utils';

import {DefOption} from './default/DefOption';

export class Option extends React.Component {
  static displayName = 'Option';
  static propTypes = {
    OptionRenderer: T.func.isRequired,
    option: T.object.isRequired,
    checked: T.bool,
    focused: T.bool,
    disabled: T.bool,
    onChange: T.func,
    onClick: T.func,
    mode: T.string,
    className: T.string,
  };
  static defaultProps = {
    OptionRenderer: DefOption,
  };

  state = {
    hovered: false,
  };

  componentDidMount() {
    this.updateFocus();
  }

  componentDidUpdate() {
    this.updateFocus();
  }

  itemRef = null;

  toggleChecked = () => {
    this.props.onChange(!this.props.checked);
  };

  handleClick = event => {
    this.toggleChecked();
    this.props.onClick(event);
  };

  updateFocus = () => {
    if (this.props.focused && this.itemRef) {
      this.itemRef.focus();
    }
  };

  handleKeyDown = event => {
    switch (event.which) {
      case 13: // Enter
      case 32: // Space
        this.toggleChecked();
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  render() {
    const {state: s, props: p} = this;
    const {OptionRenderer} = p;

    return (
      <label
        className={classes('Option', {
          'Option--hover': p.focused || s.hovered,
          [p.className]: p.className
        })}
        role="option"
        aria-selected={p.checked}
        tabIndex="-1"
        ref={ref => this.itemRef = ref}
        onKeyDown={this.handleKeyDown}
        onMouseOver={() => this.setState({hovered: true})}
        onMouseOut={() => this.setState({hovered: false})}
      >
        <OptionRenderer
          option={p.option}
          checked={p.checked}
          onClick={this.handleClick}
          disabled={p.disabled}
          mode={p.mode}
        />
      </label>
    );
  }
}
