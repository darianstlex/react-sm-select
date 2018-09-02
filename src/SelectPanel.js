import React from 'react';
import T from 'prop-types';
import {classes, defaultFilterOptions} from './utils';

import {Option} from './Option';
import {OptionList} from './OptionList';

export class SelectPanel extends React.Component {
  static propTypes = {
    OptionRenderer: T.func,
    options: T.arrayOf(T.shape({
      value: T.string,
      label: T.string,
    })).isRequired,
    value: T.arrayOf(T.string),
    isSingle: T.bool,
    selectAllLabel: T.string,
    onChange: T.func.isRequired,
    disabled: T.bool,
    enableSearch: T.bool,
    hasSelectAll: T.bool,
    filterOptions: T.func,
    closePanel: T.func.isRequired,
    maxOptionsToRender: T.number,
    searchPlaceholder: T.string,
    searchMorePlaceholder: T.string,
  };
  static defaultProps = {
    enableSearch: false,
    searchPlaceholder: 'Search',
    searchMorePlaceholder: 'Search to see more ...',
    selectAllLabel: 'Select All',
  };

  constructor(props) {
    super(props);

    this.state = {
      searchHasFocus: false,
      searchText: '',
      focusIndex: props.hasSelectAll ? 0 : 1,
    };

    this.searchInput = React.createRef();
  }

  componentDidMount() {
    if (this.searchInput.current) this.searchInput.current.focus();
  }

  selectAll = () => {
    const {props: p} = this;
    p.onChange(p.options.map(option => option.value));
  };

  selectNone = () => {
    this.props.onChange([]);
  };

  selectAllChange = checked => {
    if (checked) this.selectAll();
    else this.selectNone();
  };

  handleSearchChange = event => {
    this.setState({
      searchText: event.target.value,
      focusIndex: -1,
    });
  };

  handleItemClick = focusIndex => {
    this.setState({focusIndex});
  };

  handleKeyDown = event => {
    if (event.altKey) return;

    const update = (offset) => {
      this.updateFocus(offset);

      event.stopPropagation();
      event.preventDefault();
    };

    ({
      [event.which]: () => {},
      38: () => update(-1), // Up
      40: () => update(1), // Down
    }[event.which])();
  };

  searchFocus = () => {
    this.setState({
      searchHasFocus: true,
      focusIndex: -1,
    });
  };

  searchBlur = () => {
    this.setState({searchHasFocus: false});
  };

  allAreSelected = () => {
    const {props: p} = this;
    return p.options.length === p.value.length;
  };

  filteredOptions = () => {
    const {state: s, props: p} = this;
    const optionsToRender = p.filterOptions
      ? p.filterOptions(p.options, s.searchText)
      : defaultFilterOptions(p.options, s.searchText);

    return p.maxOptionsToRender
      ? optionsToRender.slice(0, p.maxOptionsToRender)
      : optionsToRender;
  };

  updateFocus = offset => {
    const {props: p, filteredOptions} = this;
    this.setState((s) => {
      const start = !!s.searchText || !p.hasSelectAll ? 1 : 0;
      return {focusIndex: Math.min(Math.max(start, s.focusIndex + offset), filteredOptions().length)};
    });
  };

  render() {
    const {state: s, props: p} = this;

    const selectAllOption = {
      label: p.selectAllLabel,
      value: "",
    };

    return (
      <div
        className="SelectPanel"
        role="listbox"
        onKeyDown={this.handleKeyDown}
      >
        {p.enableSearch && <div className="SelectPanel__searchContainer">
          <input
            className={classes('SelectPanel__searchField', {'SelectPanel--searchFieldFocused': s.searchHasFocus})}
            placeholder={!p.maxOptionsToRender ? p.searchPlaceholder : p.searchMorePlaceholder}
            type="text"
            ref={this.searchInput}
            onChange={this.handleSearchChange}
            onFocus={this.searchFocus}
            onBlur={this.searchBlur}
          />
        </div>}

        <div className="SelectPanel__optionContainer">
          {!p.isSingle && p.hasSelectAll && !s.searchText &&
            <Option
              className="SelectPanel__selectAll"
              focused={s.focusIndex === 0}
              checked={this.allAreSelected()}
              option={selectAllOption}
              onChange={this.selectAllChange}
              onClick={() => this.handleItemClick(0)}
              OptionRenderer={p.OptionRenderer}
              disabled={p.disabled}
            />
          }

          <OptionList
            {...this.props}
            options={this.filteredOptions()}
            focusIndex={s.focusIndex - 1}
            onClick={(e, index) => this.handleItemClick(index + 1)}
            OptionRenderer={p.OptionRenderer}
            disabled={p.disabled}
            isSingle={p.isSingle}
            closePanel={p.closePanel}
          />
        </div>
      </div>
    );
  }
}
