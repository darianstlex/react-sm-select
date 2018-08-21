import React, {Component} from 'react';
import T from 'prop-types';

import {DropDown} from './DropDown';
import {SelectPanel} from './SelectPanel';

const DefaultValueRenderer = ({value, options}) => {
  if (value.length && value.length === options.length) return (<span>All items are selected</span>);

  const labels = value.map(s => options.find(o => o.value === s)).map(s => s ? s.label : "").join(", ");

  return value.length
    ? (<span>{labels}</span>)
    : (<span className="MultiSelect__header">Select some items...</span>);
};

export class MultiSelect extends Component {
  static displayName = 'MultiSelect';
  static defaultProps = {
    hasSelectAll: true,
    shouldToggleOnHover: false,
    value: [],
    ValueRenderer: DefaultValueRenderer,
    singleSelect: false,
  };
  static propTypes = {
    id: T.string,
    options: T.arrayOf(T.shape({
      value: T.string,
      label: T.string,
    })).isRequired,
    value: T.arrayOf(T.string),
    onChange: T.func,
    ArrowRenderer: T.func,
    ValueRenderer: T.func,
    OptionRenderer: T.func,
    LoadingRenderer: T.func,
    hasSelectAll: T.bool,
    selectAllLabel: T.string,
    isLoading: T.bool,
    disabled: T.bool,
    enableSearch: T.bool,
    shouldToggleOnHover: T.bool,
    filterOptions: T.func,
    singleSelect: T.bool,
  };

  renderHeader() {
    const {options, value, ValueRenderer} = this.props;
    return (<ValueRenderer options={options} value={value}/>);
  }

  handleSelectedChanged = selected => {
    const {onChange, disabled} = this.props;
    if (!disabled && onChange) onChange(selected)
  };

  render() {
    const {
      id,
      ArrowRenderer,
      OptionRenderer,
      LoadingRenderer,
      options,
      value,
      selectAllLabel,
      isLoading,
      disabled,
      enableSearch,
      filterOptions,
      shouldToggleOnHover,
      hasSelectAll,
      singleSelect,
    } = this.props;

    return (
      <div className="MultiSelect" id={id}>
        <DropDown
          isLoading={isLoading}
          ContentComponent={SelectPanel}
          shouldToggleOnHover={shouldToggleOnHover}
          ArrowRenderer={ArrowRenderer}
          LoadingRenderer={LoadingRenderer}
          contentProps={{
            OptionRenderer,
            options,
            value,
            hasSelectAll,
            selectAllLabel,
            onChange: this.handleSelectedChanged,
            disabled,
            enableSearch,
            filterOptions,
            singleSelect,
          }}
          disabled={disabled}
        >
          {this.renderHeader()}
        </DropDown>
      </div>
    );
  }
}
