import React from 'react';
import T from 'prop-types';
import * as u from './utils';

import { MODE } from './consts';

import { Header, Value, DefArrow, DefLoading } from './Header';
import { SelectAll, Option } from './dropdown';

export class MultiSelect extends React.Component {
  static displayName = 'MultiSelect';
  static propTypes = {
    // data
    id: T.string,
    mode: T.oneOf([MODE.LIST, MODE.TAGS, MODE.COUNTER, MODE.SINGLE]),
    options: T.arrayOf(T.shape({
      value: T.string,
      label: T.string,
    })).isRequired,
    value: T.arrayOf(T.string),
    resetTo: T.arrayOf(T.string),
    maxOptionsToRender: T.number,
    // methods
    onChange: T.func,
    onBlur: T.func,
    onClose: T.func,
    // custom rendering
    Value: T.func,
    Tag: T.func,
    Loading: T.func,
    Arrow: T.func,
    Option: T.func,
    // search
    filterOptions: T.func,
    // labels / placeholders
    valuePlaceholder: T.string,
    allSelectedLabel: T.string,
    counterLabel: T.string,
    searchPlaceholder: T.string,
    searchMorePlaceholder: T.string,
    selectAllLabel: T.string,
    // controls
    disabled: T.bool,
    shouldToggleOnHover: T.bool,
    isLoading: T.bool,
    removableTag: T.bool,
    resetable: T.bool,
    enableSearch: T.bool,
    hasSelectAll: T.bool,
  };
  static defaultProps = {
    mode: MODE.LIST,
    value: [],
    resetTo: [],
    Loading: DefLoading,
    Arrow: DefArrow,
    filterOptions: u.defaultFilterOptions,
    valuePlaceholder: 'Select',
    allSelectedLabel: 'All items are selected',
    searchPlaceholder: 'Search',
    searchMorePlaceholder: 'Search to see more ...',
    selectAllLabel: 'Select All',
    shouldToggleOnHover: false,
    removableTag: true,
    resetable: false,
    enableSearch: false,
    hasSelectAll: false,
  };

  constructor(p) {
    super(p);

    this.state = {
      value: p.isLoading ? p.value : u.omitDirtyValues(p.options, p.value, this.isSingle()),
      expanded: false,
      hasFocus: false,
      selectAll: false,
      focusIndex: p.enableSearch ? -1 : -2,
      searchText: '',
    };

    this.multiSelectRef = React.createRef();
    this.headerRef = React.createRef();
    this.searchRef = React.createRef();
    this.hasListener = false;
  }

  componentDidUpdate(pp, ps) {
    const { props: p, state: s } = this;

    const loadingStart = !pp.isLoading && p.isLoading;
    const loadingEnd = pp.isLoading && !p.isLoading;
    const optionsChanges = pp.options.length !== p.options.length;

    const getClearValue = (value) => loadingStart ? value : u.omitDirtyValues(p.options, value, this.isSingle());

    const clearCurrValue = getClearValue(p.value);
    const clearPrevValue = getClearValue(pp.value);

    if (!u.areArraysEqual(clearPrevValue, clearCurrValue) || loadingStart || loadingEnd || optionsChanges)
      this.setState({ value: clearCurrValue });

    // Call onClose if it was closed
    if (ps.expanded === true && s.expanded === false) this.onEvent('onClose');

    // Call onChange if value was changed
    if (!u.areArraysEqual(ps.value, s.value)) this.onEvent('onChange');

    // Subscribe - Unsubscribe for click outside if enabled - disabled
    if (pp.disabled && !p.disabled) {
      this.hasListener = true;
      u.attachDocumentClickListener(this.handleDocumentClick);
    }
    if (!pp.disabled && p.disabled) {
      this.hasListener = false;
      u.removeDocumentClickListener(this.handleDocumentClick);
    }
  }

  componentWillUnmount() {
    if (this.hasListener) u.removeDocumentClickListener(this.handleDocumentClick);
  }


  // Common

  /**
   * Checks if mode is single
   * @returns {boolean}
   */
  isSingle = () => this.props.mode === MODE.SINGLE;

  /**
   * Handle click on document, to detect click outside
   */
  handleDocumentClick = event => {
    if (this.props.disabled) return;

    if (!u.eventPath(event).includes(this.multiSelectRef.current)) {
      this.setState({ expanded: false, hasFocus: false });
      u.removeDocumentClickListener(this.handleDocumentClick);
      this.onEvent('onBlur');
    }
  };

  /**
   * Handle MultiSelect click to subscribe for click outside
   */
  handleClick = () => {
    if (!this.props.disabled && !this.hasListener) u.attachDocumentClickListener(this.handleDocumentClick);
  };

  /**
   * Handle focus to control focus state
   */
  handleFocus = () => {
    this.setState(({hasFocus}) => !hasFocus ? { hasFocus: true } : null);
  };

  /**
   * Handle blur to control focus state
   */
  handleBlur = () => {
    this.setState(({hasFocus}) => hasFocus ? { hasFocus: false } : null);
  };

  /**
   * Toggle MultiSelect DropDown
   * @param event
   * @param value Boolean
   */
  toggleDropDown = (event, value) => {
    const { props: p } = this;
    if (p.disabled || p.isLoading) return;

    this.setState(({expanded}) => ({
      expanded: value !== undefined ? value : !expanded,
      ...(!expanded ? {
        focusIndex: p.enableSearch ? -1 : -2,
        searchText: '',
      } : {}),
    }));

    if (event) u.stopPreventPropagation(event);
  };

  /**
   * Handle hover to trigger DropDown list
   * @param expanded Boolean
   */
  handleHover = expanded => {
    if (this.props.shouldToggleOnHover) this.toggleDropDown(null, expanded);
  };

  /**
   * Detect if SelectAll should be visible
   * @returns {boolean|Boolean}
   */
  isSelectAllVisible = () => !this.isSingle() && this.props.hasSelectAll && !this.state.searchText;

  /**
   * Handle focus over search field and header depend on focus index
   * @param focusIndex Number
   */
  handleFocusControl = focusIndex => {
    if (focusIndex === -1) this.searchRef.current.focus();
    if (focusIndex === -2) this.headerRef.current.focus();
  };


  // Keyboard Navigation

  /**
   * Handle Keyboard Key Down and set focus
   * Skip search and select all if needed
   * @param event
   */
  keyDown = event => {
    const { props: p, state: s } = this;

    if (!s.expanded) this.toggleDropDown(null, true);
    else this.setState(({focusIndex}) => {
      let nextIndex = focusIndex + 1;

      if (nextIndex === -1) nextIndex = p.enableSearch ? nextIndex : nextIndex + 1;
      if (nextIndex === 0) nextIndex = this.isSelectAllVisible() ? nextIndex : nextIndex + 1;

      return s.focusIndex < this.filteredOptions().length ? { focusIndex: nextIndex } : null;
    }, () => {
      this.handleFocusControl(this.state.focusIndex);
    });
    u.stopPreventPropagation(event);
  };

  /**
   * Handle Keyboard Key Up and set focus
   * Skip search and select all if needed
   * @param event
   */
  keyUp = event => {
    const { props: p, state: s } = this;

    if (s.expanded) {
      if (s.focusIndex === -2) this.toggleDropDown(null, false);
      else this.setState(({focusIndex}) => {
        let nextIndex = focusIndex - 1;

        if (nextIndex === 0) nextIndex = this.isSelectAllVisible() ? nextIndex : nextIndex - 1;
        if (nextIndex === -1) nextIndex = p.enableSearch ? nextIndex : nextIndex - 1;

        return { focusIndex: nextIndex }
      }, () => {
        this.handleFocusControl(this.state.focusIndex);
      });
    }
    u.stopPreventPropagation(event);
  };

  /**
   * Resets value if it needed
   * @param event
   */
  clearValue = event => {
    if (this.props.resetable && this.state.focusIndex === -2) this.reset(event);
  };

  /**
   * Handle Key Press
   * @param event
   */
  handleKeyPress = event => {
    ({
      [event.which]: () => {},
      8: () => this.clearValue(event), // BackSpace
      9: () => this.toggleDropDown(null, false), // Tab
      27: () => { // Esc
        this.toggleDropDown(null, false);
        this.handleFocusControl(-2);
        u.stopPreventPropagation(event);
      },
      38: () => this.keyUp(event), // Up
      40: () => this.keyDown(event), // Down
    }[event.which])();
  };


  // Value

  /**
   * Add selected value to selected or select in single mode
   * @param optionValue value string
   */
  select = optionValue => {
    if (this.isSingle()) this.setState({ value: [optionValue] }, () => this.toggleDropDown(null,false));
    else this.setState({ value: [...this.state.value, optionValue] });
  };

  /**
   * Removes/Deselect value at index
   * @param index Number value index
   * @param event
   */
  deselect = (index, event) => {
    const { value } = this.state;
    this.setState({ value: [...value.slice(0, index), ...value.slice(index + 1)] });

    if (event) u.stopPreventPropagation(event);
  };

  /**
   * Resets value to provided state or default
   * @param event
   */
  reset = event => {
    const { props: p } = this;
    if (!p.disabled || !p.isLoading) this.setState({ value: p.resetTo });
    u.stopPreventPropagation(event);
  };


  // Search

  /**
   * Handle search field changes
   * @param event
   */
  handleSearchChange = event => {
    this.setState({ searchText: event.target.value });
  };


  // Select All

  /**
   * Checks if all options are selected
   * @returns {boolean}
   */
  allAreSelected = () => this.props.options.length === this.state.value.length;

  /**
   * Select/Deselect all options
   */
  toggleAll = () => {
    if (!this.allAreSelected()) {
      const value = this.props.options.map(option => option.value);
      this.setState({ value, focusIndex: 0 });
    } else this.setState({ value: [], focusIndex: 0 });
  };


  // Options

  /**
   * Returns array of filtered options used by search field
   * @returns []
   */
  filteredOptions = () => {
    const { state: s, props: p } = this;
    const optionsToRender = p.filterOptions(p.options, s.searchText);

    return p.maxOptionsToRender
      ? optionsToRender.slice(0, p.maxOptionsToRender)
      : optionsToRender;
  };

  /**
   * Handle Option Click
   * @param optionValue String
   * @param index Number
   */
  optionClick = (optionValue, index) => {
    const { state: s } = this;
    const valueIndex = s.value.indexOf(optionValue);

    if (valueIndex === -1 || this.isSingle()) this.select(optionValue);
    else this.deselect(valueIndex);
    this.setState({ focusIndex: index + 1 });
  };


  // Events

  /**
   * Any event coming from props
   * @param event
   */
  onEvent = event => {
    const { props: p, state: s } = this;
    if (p[event]) p[event](s.value)
  };

  render() {
    const { props: p, state: s } = this;

    return (
      <div className="MultiSelect"
        id={p.id}
        ref={this.multiSelectRef}
        onMouseDown={this.handleClick}
        onMouseEnter={() => this.handleHover(true)}
        onMouseLeave={() => this.handleHover(false)}
        onKeyDown={this.handleKeyPress}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <Header
          nodeRef={this.headerRef}
          focused={s.hasFocus}
          expanded={s.expanded}
          disabled={p.disabled}
          selected={s.focusIndex === -2}
          onClick={this.toggleDropDown}
        >
          <div className={u.classes('Header__value', {
            'Header__value--resetable': p.resetable && (!!s.value.length || !!p.resetTo.length),
          })}>
            <Value
              mode={p.mode}
              options={p.options}
              value={s.value}
              Value={p.Value}
              valuePlaceholder={p.valuePlaceholder}
              allSelectedLabel={p.allSelectedLabel}
              counterLabel={p.counterLabel}
              Tag={p.Tag}
              removableTag={p.removableTag}
              onRemove={this.deselect}
            />
          </div>
          <div className="Header__controls">
            {
              p.resetable && (!!s.value.length || !!p.resetTo.length)
              && <div className="Header__reset" onClick={this.reset}>✕</div>
            }
            {p.isLoading && <p.Loading />}
            {!p.isLoading && <p.Arrow
              value={s.value}
              options={p.options}
              hasFocus={s.hasFocus}
              disabled={p.disabled}
              expanded={s.expanded}
            />}
          </div>
        </Header>
        {s.expanded && <div className="DropDown" role="listbox">
          {p.enableSearch && (
            <input
              type="text"
              className={u.classes('DropDown__searchField', {
                'DropDown__searchField--selected': s.focusIndex === -1,
              })}
              placeholder={!p.maxOptionsToRender ? p.searchPlaceholder : p.searchMorePlaceholder}
              value={s.searchText}
              ref={this.searchRef}
              onChange={this.handleSearchChange}
              onMouseDown={() => this.setState({ focusIndex: -1 })}
              autoFocus={s.focusIndex === -1}
            />
          )}
          <ul className="OptionList">
            {this.isSelectAllVisible() && (
              <SelectAll
                key={s.value || this.filteredOptions()}
                Option={p.Option}
                focused={s.focusIndex === 0}
                checked={this.allAreSelected()}
                selectAllLabel={p.selectAllLabel}
                onClick={this.toggleAll}
              />
            )}
            {this.filteredOptions().map((option, index) => (
              <li className="OptionList__item" key={option.value}>
                <Option
                  key={s.value || this.filteredOptions()}
                  isSingle={this.isSingle()}
                  focused={s.focusIndex === index + 1}
                  checked={s.value.includes(option.value)}
                  option={option}
                  Option={p.Option}
                  onClick={() => this.optionClick(option.value, index)}
                />
              </li>
            ))}
          </ul>
        </div>}
      </div>
    );
  }
}
