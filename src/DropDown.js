import React, {Component} from 'react';
import T from 'prop-types';
import {classes} from './utils';

import {SelectPanel} from './SelectPanel';
import {DefLoading} from './default/DefLoading';
import {DefArrow} from './default/DefArrow';

export class DropDown extends Component {
  static displayName = 'DropDown';
  static propTypes = {
    contentProps: T.object.isRequired,
    isLoading: T.bool,
    disabled: T.bool,
    resetable: T.bool,
    resetTo: T.array,
    shouldToggleOnHover: T.bool,
    ArrowRenderer: T.func,
    LoadingRenderer: T.func,
    onClose: T.func,
    onReset: T.func,
  };

  static defaultProps = {
    ArrowRenderer: DefArrow,
    LoadingRenderer: DefLoading,
  };

  state = {
    expanded: false,
    hasFocus: false,
  };

  wrapper = null;

  componentWillMount() {
    document.addEventListener('touchstart', this.handleDocumentClick);
    document.addEventListener('mousedown', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.handleDocumentClick);
    document.removeEventListener('mousedown', this.handleDocumentClick);
  }

  emitClose = (expanded = false) => {
    this.setState(oldState => {
      if (oldState.expanded) this.props.onClose();
      return {expanded};
    });
  };

  handleDocumentClick = event => {
    if (this.wrapper && !this.wrapper.contains(event.target)) this.emitClose();
  };

  handleKeyDown = event => {
    switch (event.which) {
      case 27: // Escape
        this.toggleExpanded(false);
        break;
      case 38: // Up Arrow
        this.toggleExpanded(false);
        break;
      case 40: // Down Arrow
        this.toggleExpanded(true);
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  handleFocus = event => {
    if (event.target === this.wrapper && !this.state.hasFocus) this.setState({hasFocus: true});
  };

  handleBlur = () => {
    if (this.state.hasFocus) this.setState({hasFocus: false});
  };

  handleHover = expanded => {
    if (this.props.shouldToggleOnHover) this.toggleExpanded(expanded);
  };

  toggleExpanded = value => {
    const {expanded} = this.state;

    if (this.props.isLoading) return;

    const newExpanded = value === undefined ? !expanded : !!value;
    this.emitClose(newExpanded);
    if (!newExpanded && this.wrapper) this.wrapper.focus();
  };

  render() {
    const {state: s, props: p} = this;
    const {LoadingRenderer, ArrowRenderer, contentProps: { options, value }} = p;

    return (
      <div
        className="DropDown"
        tabIndex="0"
        role="combobox"
        aria-expanded={s.expanded}
        aria-readonly="true"
        aria-disabled={p.disabled}
        ref={ref => this.wrapper = ref}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseEnter={() => this.handleHover(true)}
        onMouseLeave={() => this.handleHover(false)}
      >
        <div
          className={classes('DropDown__header', {
            'DropDown__header--focused':  s.hasFocus || s.expanded,
            'DropDown__header--expanded':  s.expanded,
          })}
          onClick={() => this.toggleExpanded()}
        >
          <span className={classes('DropDown__child', {'DropDown--disabledChild':  p.disabled})}>{p.children}</span>
          <div className="DropDown__rightBlock">
            {p.resetable && (!!value.length || !!p.resetTo.length) && <div className="DropDown__reset" onClick={p.onReset}>✕</div>}
            {p.isLoading && <LoadingRenderer />}
            {!p.isLoading && <ArrowRenderer
              options={options}
              value={value}
              expanded={s.expanded}
              hasFocus={s.hasFocus}
            />}
          </div>
        </div>
        {s.expanded && (
          <div className="DropDown__panel">
            <SelectPanel {...p.contentProps} closePanel={this.emitClose} />
          </div>
        )}
      </div>
    );
  }
}
