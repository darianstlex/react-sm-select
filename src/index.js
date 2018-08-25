import React, {Component} from 'react';
import T from 'prop-types';

import {areValuesEqual, omitAlienValues} from './utils';
import {DropDown} from './DropDown';

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
    value: [],
    ValueRenderer: DefaultValueRenderer,
    hasSelectAll: true,
    resetable: false,
    resetTo: [],
    shouldToggleOnHover: false,
    singleSelect: false,
  };
  static propTypes = {
    // data
    id: T.string,
    options: T.arrayOf(T.shape({
      value: T.string,
      label: T.string,
    })).isRequired,
    value: T.arrayOf(T.string),
    // methods
    onChange: T.func,
    onClose: T.func,
    // overrides
    ArrowRenderer: T.func,
    ValueRenderer: T.func,
    OptionRenderer: T.func,
    LoadingRenderer: T.func,
    selectAllLabel: T.string,
    filterOptions: T.func,
    searchPlaceholder: T.string,
    resetTo: T.array,
    // controls
    hasSelectAll: T.bool,
    isLoading: T.bool,
    disabled: T.bool,
    enableSearch: T.bool,
    resetable: T.bool,
    shouldToggleOnHover: T.bool,
    singleSelect: T.bool,
    maxOptionsToRender: T.number,
  };

  state = {
    localValue: omitAlienValues(this.props.options, this.props.value, this.props.singleSelect),
    changed: false,
  };

  static getDerivedStateFromProps({options, value, singleSelect}, {localValue}) {
    const clearValue = omitAlienValues(options, value, singleSelect);
    if (!areValuesEqual(value, localValue)) return {localValue: clearValue};
    return null;
  }

  renderHeader = () => {
    const { props: {ValueRenderer, options}, state: {localValue: value} } = this;
    return (<ValueRenderer {...{options, value}}/>);
  };

  onChange = value => {
    const {onChange, onClose, disabled, singleSelect} = this.props;
    if (!disabled) {
      if (onChange) onChange(value);
      this.setState({localValue: value, changed: true}, () => {
        if (singleSelect && onClose) onClose(value);
      });
    }
  };

  onClose = () => {
    const {props: {onClose, disabled}, state: {localValue, changed} } = this;
    if (onClose && changed && !disabled) onClose(localValue);
    this.setState({changed: false});
  };

  onReset = event => {
    const {onChange, disabled, resetTo} = this.props;

    if (!disabled) {
      this.setState({localValue: resetTo});
      if (onChange) onChange(resetTo);
    }

    event.stopPropagation();
    event.preventDefault();
  };

  render() {
    const {
      id,
      options,
      ArrowRenderer,
      OptionRenderer,
      LoadingRenderer,
      filterOptions,
      selectAllLabel,
      isLoading,
      disabled,
      enableSearch,
      resetable,
      resetTo,
      shouldToggleOnHover,
      hasSelectAll,
      singleSelect,
      maxOptionsToRender,
      searchPlaceholder,
    } = this.props;
    const { onClose, onChange, onReset, state: {localValue} } = this;

    return (
      <div className="MultiSelect" id={id}>
        <DropDown
          {...{
            onClose,
            onReset,
            ArrowRenderer,
            LoadingRenderer,
            isLoading,
            shouldToggleOnHover,
            disabled,
            resetable,
            resetTo,
          }}
          contentProps={{
            OptionRenderer,
            options,
            value: localValue,
            hasSelectAll,
            selectAllLabel,
            onChange,
            disabled,
            enableSearch,
            filterOptions,
            singleSelect,
            maxOptionsToRender,
            searchPlaceholder,
          }}
        >
          {this.renderHeader()}
        </DropDown>
      </div>
    );
  }
}
