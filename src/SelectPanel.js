import React, {Component} from 'react';
import T from 'prop-types';
import {classes, defaultFilterOptions} from './utils';

import {SelectItem} from './SelectItem';
import {SelectList} from './SelectList';

export class SelectPanel extends Component {
  static propTypes = {
    OptionRenderer: T.func,
    options: T.arrayOf(T.shape({
      value: T.string,
      label: T.string,
    })).isRequired,
    value: T.array,
    selectAllLabel: T.string,
    onChange: T.func.isRequired,
    disabled: T.bool,
    enableSearch: T.bool,
    hasSelectAll: T.bool,
    filterOptions: T.func,
    closePanel: T.func.isRequired,
  };
  static defaultProps = {
    enableSearch: false,
  };

  searchInput = null;

  state = {
    searchHasFocus: false,
    searchText: "",
    focusIndex: 0,
  };

  componentDidMount = () => {
    if (this.searchInput) this.searchInput.focus();
  };

  selectAll = () => {
    const {onChange, options} = this.props;
    const allValues = options.map(option => option.value);

    onChange(allValues);
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
    switch (event.which) {
      case 38: // Up Arrow
        this.updateFocus(-1);
        break;
      case 40: // Down Arrow
        this.updateFocus(1);
        break;
      default:
        return;
    }
    event.stopPropagation();
    event.preventDefault();
  };

  handleSearchFocus = searchHasFocus => {
    this.setState({
      searchHasFocus,
      focusIndex: -1,
    });
  };

  allAreSelected = () => {
    const {options, value} = this.props;
    return options.length === value.length;
  };

  filteredOptions = () => {
    const {searchText} = this.state;
    const {options, filterOptions: customFilterOptions} = this.props;

    return customFilterOptions
      ? customFilterOptions(options, searchText)
      : defaultFilterOptions(options, searchText);
  };

  updateFocus = offset => {
    const newFocus = this.state.focusIndex + offset;
    this.setState({focusIndex: Math.min(Math.max(0, newFocus), this.props.options.length)});
  };

  render() {
    const {focusIndex, searchHasFocus, searchText} = this.state;
    const {
      OptionRenderer,
      selectAllLabel,
      disabled,
      enableSearch,
      hasSelectAll,
      singleSelect,
      closePanel,
    } = this.props;

    const selectAllOption = {
      label: selectAllLabel || "Select All",
      value: "",
    };

    return (
      <div
        className="SelectPanel"
        role="listbox"
        onKeyDown={this.handleKeyDown}
      >
        {enableSearch && <div className="SelectPanel__searchContainer">
          <input
            className={classes('SelectPanel__searchField', {'SelectPanel--searchFieldFocused': searchHasFocus})}
            placeholder="Search"
            type="text"
            ref={ref => (this.searchInput = ref)}
            onChange={this.handleSearchChange}
            onFocus={() => this.handleSearchFocus(true)}
            onBlur={() => this.handleSearchFocus(false)}
          />
        </div>}

        {!singleSelect && hasSelectAll && !searchText &&
          <SelectItem
            focused={focusIndex === 0}
            checked={this.allAreSelected()}
            option={selectAllOption}
            onChange={this.selectAllChange}
            onClick={() => this.handleItemClick(0)}
            OptionRenderer={OptionRenderer}
            disabled={disabled}
          />
        }

        <SelectList
          {...this.props}
          options={this.filteredOptions()}
          focusIndex={focusIndex - 1}
          onClick={(e, index) => this.handleItemClick(index + 1)}
          OptionRenderer={OptionRenderer}
          disabled={disabled}
          singleSelect={singleSelect}
          closePanel={closePanel}
        />
      </div>
    );
  }
}
