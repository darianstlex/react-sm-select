> Single/Multi Select React Component

Inspired by [React MultiSelect](https://github.com/Khan/react-multi-select)

[Demo and Specimens](https://darianstlex.github.io/react-sm-select) Catalog

### Installation

Install the react-sm-select npm package:

```code
npm install react-sm-select
```

### Usage

```code
import { MultiSelect } from 'react-sm-select';
import 'react-sm-select/dist/styles.css';

.........

state = {
  options: [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' }
  ],
  value: ['blue']
}

.........

<MultiSelect
  id="some-id"
  options={this.state.options}
  value={this.state.value}
  onChange={value => this.setState({ value })}
/>
```

### Styling

Can be used css overriding, see compiled css. Or use scss variables for general styling.

```code
@import 'react-sm-select/scss/variables';

$MS-backgroundColor: #fff;
$MS-focusColor: #1298d4;
$MS-fieldHeight: 40px;
$MS-borderRadius: 5px;
$MS-dividerColor: #cfd4d9;
$MS-borderColor: #aaa;
$MS-textColor: #333;
$MS-itemTextColor: #666666;
$MS-itemHoverColor: #ebf5ff;
$MS-searchPlaceholderColor: #c7c7c7;
$MS-dropDownHeight: 300px;
$MS-tagBackgroundColor: $MS-focusColor;
$MS-tagColor: #fff;
$MS-tagCloseBackgroundColor: #d1d1d1;
$MS-tagCloseColor: $MS-textColor;
$MS-tagBorderRadius: 3px;

@import 'react-sm-select/scss/main';
```

### Props

- **`id: string`** ID attribute of the container
- **`options: array`** Array of options to select from in format: **Required**

```code
[
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' }
]
```

- **`value: array: []`** Array of preselected options in format:

```code
[ 'red', 'blue' ]
```

- **`onChange: function`** Function to be executed on change:

```code
onChange(value) {
  // value - array of selected values, see 'value' property
}
```

- **`onClose: function`** Function to be executed on close:

```code
onClose(value) {
  // value - array of selected values, see 'value' property
}
```

- **`enableSearch: boolean: false`** Enables search field
- **`isLoading: boolean: false`** Shows loading indicator
- **`disabled: boolean: false`** Disable component
- **`hasSelectAll: boolean: true`** Shows 'Select All' options
- **`resetable: boolean: false`** Add clear button to reset value
- **`resetTo: array: []`** Value to be reseted to
- **`selectAllLabel: boolean: Select All`** Provides custom label for 'Select All'
- **`shouldToggleOnHover: boolean: false`** Toggle select drop-down on hover
- **`singleSelect: boolean: false`** Set component to behave as a single select
- **`maxOptionsToRender: number: undefined`** Maximum Options to render, but search over all
- **`searchPlaceholder: string: undefined`** Search Field placeholder
- **`filterOptions: function`** Custom filter function:

```code
filterOptions(options, text) {
  // options - see 'options' property
  // text - search string
  
  return - array of filtered options
}
```

- **`ValueRenderer: function`** Render custom Value:

```code
ValueRenderer({value, options}) {
  // options: array - see 'options' property
  // value: array - see 'value' property
  
  return - component to render custom value
}
```

- **`OptionRenderer: function`** Render custom Option

```code
OptionRenderer({option, checked, disabled, onClick}) {
  // option: object - from options props: { value, label }  
  // checked: boolean - define if option is checked
  // disabled: boolean - disable option if component is disabled
  // onClick: function - notifies component about option click
  
  return - component to render custom Option
}
```

- **`ArrowRenderer: function`** Render custom DropDown Arrow

```code
ArrowRenderer({options, value, expanded, hasFocus}) {
  // options: array - see 'options' prop 
  // value: array - see 'value' property
  // expanded: boolean - expanded component status
  // hasFocus: boolean - hasFocus component status
  
  return - component to render custom Arrow
}
```

- **`LoadingRenderer: function`** Render custom Loading Indicator

```code
LoadingRenderer() {
  return - component to render custom Loading Indicator
}
```

- **`TagsRenderer: function`** Render custom Tags Container, shows in MultiSelect only

```code
lang: js
---
TagsRenderer({value, options, TagRenderer, onTagRemove, removableTag}) {
  // value: array - see 'value' property
  // options: array - see 'options' prop 
  // TagRenderer: function - default tag renderer
  // onTagRemove: function - callback to remove selected tag
  // removableTag: boolean - display/hide remove tag button
}
```

- **`TagRenderer: function`** Render custom Tag, shows in MultiSelect only

```code
lang: js
---
TagRenderer({tag, index, removableTag, onTagRemove}) {
  // tag: string - tag label
  // index: number - tag index in array used in removal 
  // removableTag: boolean - display/hide remove tag button
  // onTagRemove: function - callback to remove selected tag
}
```
