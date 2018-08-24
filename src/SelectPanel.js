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
    maxOptionsToRender: T.number,
    searchPlaceholder: T.string,
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

    const update = offset => {
      this.updateFocus(offset);
      event.stopPropagation();
      event.preventDefault();
    };

    if (event.which === 38 || (event.shiftKey && event.which === 9)) update(-1);
    else if (event.which === 40 || event.which === 9) update(1);
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
    const {options, value} = this.props;
    return options.length === value.length;
  };

  filteredOptions = () => {
    const {searchText} = this.state;
    const {options, filterOptions: customFilterOptions, maxOptionsToRender} = this.props;

    const optionsToRender = customFilterOptions
      ? customFilterOptions(options, searchText)
      : defaultFilterOptions(options, searchText);

    return maxOptionsToRender
      ? optionsToRender.slice(0, maxOptionsToRender - 1)
      : optionsToRender;
  };

  updateFocus = offset => {
    this.setState(({searchText, focusIndex}) => {
      const start = !!searchText ? 1 : 0;
      return {focusIndex: Math.min(Math.max(start, focusIndex + offset), this.filteredOptions().length)}
    });
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
      maxOptionsToRender,
      searchPlaceholder,
    } = this.props;

    const selectAllOption = {
      label: selectAllLabel || "Select All",
      value: "",
    };
    const placeholder = searchPlaceholder || (maxOptionsToRender ? 'Search to see more ...' : 'Search');

    return (
      <div
        className="SelectPanel"
        role="listbox"
        onKeyDown={this.handleKeyDown}
      >
        {enableSearch && <div className="SelectPanel__searchContainer">
          <input
            className={classes('SelectPanel__searchField', {'SelectPanel--searchFieldFocused': searchHasFocus})}
            placeholder={placeholder}
            type="text"
            ref={ref => (this.searchInput = ref)}
            onChange={this.handleSearchChange}
            onFocus={this.searchFocus}
            onBlur={this.searchBlur}
          />
        </div>}

        {!singleSelect && hasSelectAll && !searchText &&
          <SelectItem
            className="SelectPanel__selectAll"
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
