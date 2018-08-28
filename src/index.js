import React from 'react';
import T from 'prop-types';

import {areValuesEqual, omitDirtyValues} from './utils';
import {DropDown} from './DropDown';
import {DefValue} from './default/DefValue';
import {DefTag} from './default/DefTag';
import {DefCounter} from './default/DefCounter';

export class MultiSelect extends React.Component {
  static displayName = 'MultiSelect';
  static propTypes = {
    // data
    id: T.string,
    options: T.arrayOf(T.shape({
      value: T.string,
      label: T.string,
    })).isRequired,
    value: T.arrayOf(T.string),
    mode: T.oneOf(['list', 'tags', 'counter', 'single']),
    resetTo:T.arrayOf(T.string),
    // methods
    onChange: T.func,
    onClose: T.func,
    // renderers / overrides
    ArrowRenderer: T.func,
    ValueRenderer: T.func,
    TagRenderer: T.func,
    OptionRenderer: T.func,
    LoadingRenderer: T.func,
    filterOptions: T.func,
    // labels / placeholders
    valuePlaceholder: T.string,
    allSelectedLabel: T.string,
    selectAllLabel: T.string,
    searchPlaceholder: T.string,
    searchMorePlaceholder: T.string,
    // controls
    removableTag: T.bool,
    hasSelectAll: T.bool,
    isLoading: T.bool,
    disabled: T.bool,
    enableSearch: T.bool,
    resetable: T.bool,
    shouldToggleOnHover: T.bool,
    maxOptionsToRender: T.number,
  };
  static defaultProps = {
    mode: 'list',
    value: [],
    ValueRenderer: DefValue,
    TagRenderer: DefTag,
    hasSelectAll: false,
    resetable: false,
    resetTo: [],
    shouldToggleOnHover: false,
    removableTag: true,
    valuePlaceholder: 'Select',
    allSelectedLabel: 'All items are selected',
  };

  state = {
    localValue: omitDirtyValues(this.props.options, this.props.value, this.props.mode === 'single'),
    changed: false,
  };


  static getDerivedStateFromProps({options, value, mode}, {localValue}) {
    const clearValue = omitDirtyValues(options, value, mode === 'single');
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
        removableTag,
        valuePlaceholder,
        allSelectedLabel,
        mode,
      },
      state: {localValue: value},
      onTagRemove,
    } = this;

    if (mode !== 'tags' && mode !== 'counter' && value.length === options.length)
      return (<span className="MultiSelect__value">{allSelectedLabel}</span>);

    if (!value.length) return (<span className="MultiSelect__value">{valuePlaceholder}</span>);

    if (mode === 'tags') {
      const labels = value.map(val => options.find(opt => opt.value === val).label);
      return (
        <div className="MultiSelect__tags">
          {labels.map((label, index) => <TagRenderer key={index} {...{label, index, onTagRemove, removableTag}}/>)}
        </div>
      );
    }
    if (mode === 'counter') return <DefCounter {...{valuePlaceholder, value, options}}/>;

    return <ValueRenderer {...{options, value}}/>;
  };

  onChange = value => {
    const {onChange, onClose, disabled, mode} = this.props;
    if (!disabled) {
      if (onChange) onChange(value);
      this.setState({localValue: value, changed: true}, () => {
        if (mode === 'single' && onClose) onClose(value);
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
      mode,
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
            mode,
            OptionRenderer,
            options,
            value: localValue,
            hasSelectAll,
            selectAllLabel,
            onChange,
            disabled,
            enableSearch,
            filterOptions,
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
