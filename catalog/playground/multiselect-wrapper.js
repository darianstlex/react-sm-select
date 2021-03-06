import React, {Fragment} from 'react';
import {Controller} from './controller';
import {MultiSelect} from '../../src'

export class MultiSelectWrapper extends React.Component {

  state = {
    mode: 'list',
    value: ['red2', 'blue3'],
    options: [
      {value: 'red', label: 'Red'},
      {value: 'green', label: 'Green'},
      {value: 'blue', label: 'Blue'},
      {value: 'brown', label: 'Brown'},
      {value: 'red2', label: 'Red 2'},
      {value: 'green2', label: 'Green 2'},
      {value: 'blue2', label: 'Blue 2'},
      {value: 'brown2', label: 'Brown 2'},
      {value: 'red3', label: 'Red 3'},
      {value: 'green3', label: 'Green 3'},
      {value: 'blue3', label: 'Blue 3'},
      {value: 'brown3', label: 'Brown 3'},
    ],
    resetable: true,
    resetTo: [],
    enableSearch: true,
    maxOptionsToRender: 7,
    isLoading: false,
    disabled: false,
    hasSelectAll: true,
    removableTag: true,
    selectAllLabel: 'Select All Colors',
    shouldToggleOnHover: false,
    searchPlaceholder: 'Search for color ...',
    searchMorePlaceholder: 'Type to see more ...',
    valuePlaceholder: 'Select something ...',
    counterLabel: 'Selected',
    allSelectedLabel: 'All colors are selected',
  };

  getControls = () => [
    {place: 'left', prop: 'valuePlaceholder', type: 'string', value: this.state.valuePlaceholder},
    {place: 'left', prop: 'allSelectedLabel', type: 'string', value: this.state.allSelectedLabel},
    {place: 'left', prop: 'searchPlaceholder', type: 'string', value: this.state.searchPlaceholder},
    {place: 'left', prop: 'searchMorePlaceholder', type: 'string', value: this.state.searchMorePlaceholder},
    {place: 'left', prop: 'selectAllLabel', type: 'string', value: this.state.selectAllLabel},
    {place: 'left', prop: 'counterLabel', type: 'string', value: this.state.counterLabel},
    {place: 'right', prop: 'mode', type: 'select', value: this.state.mode, options: ['list', 'tags', 'counter', 'single']},
    {place: 'right', prop: 'maxOptionsToRender', type: 'number', value: this.state.maxOptionsToRender},
    {place: 'right', prop: 'resetable', type: 'boolean', value: this.state.resetable},
    {place: 'right', prop: 'enableSearch', type: 'boolean', value: this.state.enableSearch},
    {place: 'right', prop: 'isLoading', type: 'boolean', value: this.state.isLoading},
    {place: 'right', prop: 'disabled', type: 'boolean', value: this.state.disabled},
    {place: 'right', prop: 'hasSelectAll', type: 'boolean', value: this.state.hasSelectAll},
    {place: 'right', prop: 'shouldToggleOnHover', type: 'boolean', value: this.state.shouldToggleOnHover},
    {place: 'right', prop: 'removableTag', type: 'boolean', value: this.state.removableTag},
    {place: 'bottom', prop: 'value', type: 'array', value: this.state.value, rows: 1},
    {place: 'bottom', prop: 'resetTo', type: 'array', value: this.state.resetTo, rows: 1},
    {place: 'bottom', prop: 'options', type: 'array', value: this.state.options, rows: 12},
  ];

  render() {
    const controls = this.getControls();
    return (
      <Fragment>
        <MultiSelect
          mode={this.state.mode}
          valuePlaceholder={this.state.valuePlaceholder}
          allSelectedLabel={this.state.allSelectedLabel}
          enableSearch={this.state.enableSearch}
          searchPlaceholder={this.state.searchPlaceholder}
          searchMorePlaceholder={this.state.searchMorePlaceholder}
          selectAllLabel={this.state.selectAllLabel}
          counterLabel={this.state.counterLabel}
          disabled={this.state.disabled}
          shouldToggleOnHover={this.state.shouldToggleOnHover}
          hasSelectAll={this.state.hasSelectAll}
          isLoading={this.state.isLoading}
          resetable={this.state.resetable}
          resetTo={this.state.resetTo}
          maxOptionsToRender={this.state.maxOptionsToRender}
          options={this.state.options}
          value={this.state.value}
          removableTag={this.state.removableTag}
          onChange={value => {
            console.log('OnChange', value);
            this.setState({value})}
          }
          onClose={value => {
            console.log('OnClose', value);
          }}
          onBlur={value => {
            console.log('OnBlur', value);
          }}
        />
        <Controller key={this.state.value} controls={controls} onUpdate={value => this.setState(value)} />
      </Fragment>
    )
  }
}
