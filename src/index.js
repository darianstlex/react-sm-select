import React, {Component} from 'react';
import T from 'prop-types';

import {areValuesEqual, omitDirtyValues} from './utils';
import {DropDown} from './DropDown';

const DefaultValueRenderer = ({value, options}) => {
  if (value.length && value.length === options.length) return (<span>All items are selected</span>);

  const labels = value.map(val => options.find(opt => opt.value === val).label).join(', ');

  return value.length
    ? (<span>{labels}</span>)
    : (<span className="MultiSelect__value">Select ...</span>);
};

const DefaultTagsRenderer = ({value, options, TagRenderer, onTagRemove, removableTag}) => {
  const labels = value.map(val => options.find(opt => opt.value === val).label);
  return (
    <div className="MultiSelect__tags">
      {labels.map((tag, index) => <TagRenderer key={index} {...{tag, index, onTagRemove, removableTag}}/>)}
    </div>
  );
};

const DefaultTagRenderer = ({tag, index, removableTag, onTagRemove}) => (
  <div className="MultiSelect__tag">
    <div className="MultiSelect__tag__label">{tag}</div>
    {removableTag && <div className="MultiSelect__tag__close" onClick={event => onTagRemove(index, event)}>✕</div>}
  </div>
);

export class MultiSelect extends Component {
  static displayName = 'MultiSelect';
  static defaultProps = {
    value: [],
    ValueRenderer: DefaultValueRenderer,
    TagsRenderer: DefaultTagsRenderer,
    TagRenderer: DefaultTagRenderer,
    hasSelectAll: true,
    resetable: false,
    resetTo: [],
    shouldToggleOnHover: false,
    singleSelect: false,
    valueAsTag: false,
    removableTag: true,
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
    TagsRenderer: T.func,
    TagRenderer: T.func,
    OptionRenderer: T.func,
    LoadingRenderer: T.func,
    selectAllLabel: T.string,
    filterOptions: T.func,
    searchPlaceholder: T.string,
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
      props: {ValueRenderer, TagsRenderer, TagRenderer, options, valueAsTag, removableTag, singleSelect},
      state: {localValue: value},
      onTagRemove,
    } = this;

    return !singleSelect && valueAsTag && ValueRenderer === DefaultValueRenderer
      ? <TagsRenderer {...{value, options, TagRenderer, onTagRemove, removableTag}}/>
      : <ValueRenderer {...{options, value}}/>;
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
          {this.renderValue()}
        </DropDown>
      </div>
    );
  }
}
