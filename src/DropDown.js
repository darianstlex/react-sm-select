import React, {Component} from 'react';
import T from 'prop-types';
import {classes} from './utils';

import {SelectPanel} from './SelectPanel';

const DefaultLoadingRenderer  = () => (
  <span className="LoadingIndicator">
    <span className="LoadingIndicator__icon" />
  </span>
);

const DefaultArrowRenderer = ({expanded}) => (
  <div className="Arrow">
    <div
      className={classes({
        'Arrow--up': expanded,
        'Arrow--down': !expanded,
      })}
    />
  </div>
);

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
    ArrowRenderer: DefaultArrowRenderer,
    LoadingRenderer: DefaultLoadingRenderer,
  };

  state = {
    expanded: false,
    hasFocus: false,
  };

  wrapper = null;

  componentWillUpdate = () => {
    document.addEventListener('touchstart', this.handleDocumentClick);
    document.addEventListener('mousedown', this.handleDocumentClick);
  };

  componentWillUnmount = () => {
    document.removeEventListener('touchstart', this.handleDocumentClick);
    document.removeEventListener('mousedown', this.handleDocumentClick);
  };

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

  handleHover = toggleExpanded => {
    if (this.props.shouldToggleOnHover) this.toggleExpanded(toggleExpanded);
  };

  toggleExpanded = value => {
    const {expanded} = this.state;

    if (this.props.isLoading) return;

    const newExpanded = value === undefined ? !expanded : !!value;
    this.emitClose(newExpanded);
    if (!newExpanded && this.wrapper) this.wrapper.focus();
  };

  renderPanel = () => {
    return (
      <div className="DropDown__panel">
        <SelectPanel {...this.props.contentProps} closePanel={() => this.emitClose()} />
      </div>
    );
  };

  render() {
    const {expanded, hasFocus} = this.state;
    const {
      ArrowRenderer,
      LoadingRenderer,
      onReset,
      children,
      isLoading,
      disabled,
      resetable,
      resetTo,
      contentProps: { options, value }
    } = this.props;

    return (
      <div
        className="DropDown"
        tabIndex="0"
        role="combobox"
        aria-expanded={expanded}
        aria-readonly="true"
        aria-disabled={disabled}
        ref={ref => this.wrapper = ref}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseEnter={() => this.handleHover(true)}
        onMouseLeave={() => this.handleHover(false)}
      >
        <div
          className={classes('DropDown__header', {
            'DropDown__header--focused':  hasFocus || expanded,
            'DropDown__header--expanded':  expanded,
          })}
          onClick={() => this.toggleExpanded()}
        >
          <span className={classes('DropDown__child', {'DropDown--disabledChild':  disabled})}>{children}</span>
          <div className="DropDown__rightBlock">
            {resetable && (!!value.length || !!resetTo.length) && <div className="DropDown__reset" onClick={onReset}>✕</div>}
            {isLoading && <LoadingRenderer />}
            {!isLoading && <ArrowRenderer {...{options, value, expanded, hasFocus}}/>}
          </div>
        </div>
        {expanded && this.renderPanel()}
      </div>
    );
  }
}
