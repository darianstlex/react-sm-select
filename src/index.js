import React, {Component} from 'react';
import T from 'prop-types';

import {areValuesEqual, omitDirtyValues} from './utils';
import {DropDown} from './DropDown';

const DefaultValueRenderer = ({value, options}) => {
  return (<span>{value.map(val => options.find(opt => opt.value === val).label).join(', ')}</span>);
};

const DefaultTagRenderer = ({label, index, removableTag, onTagRemove}) => (
  <div className="MultiSelect__tag">
    <div className="MultiSelect__tag__label">{label}</div>
    {removableTag && <div className="MultiSelect__tag__close" onClick={event => onTagRemove(index, event)}>✕</div>}
  </div>
);

export class MultiSelect extends Component {
  static displayName = 'MultiSelect';
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
    TagRenderer: T.func,
    OptionRenderer: T.func,
    LoadingRenderer: T.func,
    valuePlaceholder: T.string,
    allSelectedLabel: T.string,
    selectAllLabel: T.string,
    filterOptions: T.func,
    searchPlaceholder: T.string,
    searchMorePlaceholder: T.string,
    resetTo: T.array,
    // controls
    valueAsTag: T.bool,
    removableTag: T.bool,
    hasSelectAll: T.bool,
    isLoading: T.bool,
    disabled: T.bool,
    enableSearch: T.bool,
    resetable: T.bool,
    shouldToggleOnHover: T.bool,
    singleSelect: T.bool,
    maxOptionsToRender: T.number,
  };
  static defaultProps = {
    value: [],
    ValueRenderer: DefaultValueRenderer,
    TagRenderer: DefaultTagRenderer,
    hasSelectAll: true,
    resetable: false,
    resetTo: [],
    shouldToggleOnHover: false,
    singleSelect: false,
    valueAsTag: false,
    removableTag: true,
    valuePlaceholder: 'Select ...',
    allSelectedLabel: 'All items are selected',
  };

  state = {
    localValue: omitDirtyValues(this.props.options, this.props.value, this.props.singleSelect),
    changed: false,
  };

  static getDerivedStateFromProps({options, value, singleSelect}, {localValue}) {
    const clearValue = omitDirtyValues(options, value, singleSelect);
    if (!areValuesEqual(value, localValue)) return {localValue: clearValue};
    return null;
  }

  onTagRemove = (index, event) => {
    const {localValue} = this.state;
    const removed = [
      ...localValue.slice(0, index),
      ...localValue.slice(index + 1),
    ];
    this.onChange(removed);

    event.stopPropagation();
    event.preventDefault();
  };

  renderValue = () => {
    const {
      props: {
        ValueRenderer,
        TagRenderer,
        options,
        valueAsTag,
        removableTag,
        singleSelect,
        valuePlaceholder,
        allSelectedLabel,
      },
      state: {localValue: value},
      onTagRemove,
    } = this;

    if (!value.length) return (<span className="MultiSelect__value">{valuePlaceholder}</span>);
    if (!valueAsTag && value.length && value.length === options.length)
      return (<span className="MultiSelect__value">{allSelectedLabel}</span>);

    if (!singleSelect && valueAsTag && ValueRenderer === DefaultValueRenderer) {
      const labels = value.map(val => options.find(opt => opt.value === val).label);
      return (
        <div className="MultiSelect__tags">
          {labels.map((label, index) => <TagRenderer key={index} {...{label, index, onTagRemove, removableTag}}/>)}
        </div>
      );
    }

    return <ValueRenderer {...{options, value}}/>
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
    const {props: {onClose, disabled}, state: {localValue, changed}} = this;
    if (onClose && changed && !disabled) onClose(localValue);
    this.setState({changed: false});
  };

  onReset = event => {
    const {onChange, disabled, resetTo, isLoading} = this.props;

    if (!disabled && !isLoading) {
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
      searchMorePlaceholder,
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
            searchMorePlaceholder,
          }}
        >
          {this.renderValue()}
        </DropDown>
      </div>
    );
  }
}
