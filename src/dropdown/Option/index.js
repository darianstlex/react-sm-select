import React from 'react';
import T from 'prop-types';
import * as u from '../../utils';

import { DefOption } from './DefOption';

export class Option extends React.Component {
  static displayName = 'Option';
  static propTypes = {
    Option: T.func,
    option: T.object.isRequired,
    checked: T.bool,
    focused: T.bool,
    onClick: T.func,
    isSingle: T.bool,
  };
  static defaultProps = {
    Option: DefOption,
  };

  constructor() {
    super();

    this.state = {
      hovered: false,
    };

    this.optionRef = React.createRef();
  }

  componentDidMount() {
    this.updateFocus();
  }

  componentDidUpdate() {
    this.updateFocus();
  }

  updateFocus = () => {
    if (this.props.focused && this.optionRef.current) this.optionRef.current.focus();
  };

  handleKeyDown = event => {
    if (event.which === 13 || event.which === 32) { // Enter || Space
      this.props.onClick();
      u.stopPreventPropagation(event);
    }
  };

  render() {
    const { state: s, props: p } = this;

    return (
      <label
        className={u.classes('Option', {
          'Option--focus': p.focused,
          'Option--hover': s.hovered,
        })}
        role="option"
        aria-selected={p.checked}
        tabIndex="-1"
        ref={this.optionRef}
        onMouseDown={p.onClick}
        onKeyDown={this.handleKeyDown}
        onMouseOver={() => this.setState({ hovered: true })}
        onMouseOut={() => this.setState({ hovered: false })}
      >
        <p.Option
          option={p.option}
          checked={p.checked}
          isSingle={p.isSingle}
        />
      </label>
    );
  }
}
