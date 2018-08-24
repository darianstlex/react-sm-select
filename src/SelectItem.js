import React, {Component} from 'react';
import T from 'prop-types';
import {classes} from './utils';


class DefaultOptionRenderer extends Component {
  static propTypes = {
    checked: T.bool.isRequired,
    option: T.object.isRequired,
    disabled: T.bool,
    onClick: T.func,
    singleSelect: T.bool,
  };

  render() {
    const {checked, option, onClick, disabled, singleSelect} = this.props;

    return (
      <div className="SelectItem__renderer">
        <span className={classes('SelectItem__label', {'SelectItem--labelDisabled': disabled})}>
          {option.label}
        </span>
        <input
          style={{visibility: singleSelect ? 'hidden' : 'visible'}}
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

export class SelectItem extends Component {
  static displayName = 'SelectItem';
  static propTypes = {
    OptionRenderer: T.func.isRequired,
    option: T.object.isRequired,
    checked: T.bool,
    focused: T.bool,
    disabled: T.bool,
    onChange: T.func,
    onClick: T.func,
    singleSelect: T.bool,
  };
  static defaultProps = {
    OptionRenderer: DefaultOptionRenderer,
  };

  state = {
    hovered: false,
  };

  componentDidMount = () => {
    this.updateFocus();
  };

  componentDidUpdate = () => {
    this.updateFocus();
  };

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
    const {OptionRenderer, option, checked, focused, disabled, singleSelect} = this.props;
    const {hovered} = this.state;

    return (
      <label
        className={classes('SelectItem', {'SelectItem--hover': focused || hovered})}
        role="option"
        aria-selected={checked}
        tabIndex="-1"
        ref={ref => this.itemRef = ref}
        onKeyDown={this.handleKeyDown}
        onMouseOver={() => this.setState({hovered: true})}
        onMouseOut={() => this.setState({hovered: false})}
      >
        <OptionRenderer
          option={option}
          checked={checked}
          onClick={this.handleClick}
          disabled={disabled}
          singleSelect={singleSelect}
        />
      </label>
    );
  }
}
