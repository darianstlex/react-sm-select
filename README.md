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
@import 'react-sm-select/dist/variables';

$SM-white: #fff;
$SM-brightGrey: #ebf5ff;
$SM-lightGrey: #cfd4d9;
$SM-lightBlue: #1298d4;
$SM-grey: #949ca6;
$SM-darkBlue: #143154;

// General Colors
$SM-backgroundColor: $SM-white;
$SM-focusColor: $SM-lightBlue;
$SM-mutedColor: $SM-grey;
$SM-borderColor: $SM-grey;
$SM-textColor: $SM-darkBlue;

// Value Colors
$SM-valueColor: $SM-textColor;
$SM-valuePlaceholderColor: $SM-mutedColor;
$SM-counterColor: $SM-focusColor;

$SM-tagColor: $SM-white;
$SM-tagBackgroundColor: $SM-focusColor;
$SM-tagCloseColor: $SM-textColor;
$SM-tagCloseBackgroundColor: $SM-lightGrey;

// Search Colors
$SM-searchPlaceholderColor: $SM-mutedColor;

// Option Colors
$SM-itemTextColor: $SM-textColor;
$SM-itemBackgroundHoverColor: $SM-brightGrey;
$SM-dividerColor: $SM-lightGrey;
$SM-selectAllColor: $SM-itemTextColor;

// Size
$SM-fieldHeight: 42px;
$SM-itemHeight: $SM-fieldHeight - 4px;
$SM-borderRadius: 5px;
$SM-tagBorderRadius: 3px;
$SM-dropDownHeight: 300px;

// Other
$SM-dropDownZIndex: 1;

@import 'react-sm-select/dist/main';
```

### Props

#### Controls

---

- **`mode: string: 'list'`** Behaviour mode: 'list', 'tags', 'counter', 'single'

- **`options: array`** Array of options to select from: **Required**

```code
[
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' }
]
```


- **`value: array: []`** Array of preselected options:

```code
[ 'red', 'blue' ]
```


- **`disabled: boolean: false`** Disable component

- **`enableSearch: boolean: false`** Enables search field

- **`id: string`** ID attribute of the container

- **`isLoading: boolean: false`** Shows loading indicator

- **`hasSelectAll: boolean: false`** Shows 'Select All'

- **`maxOptionsToRender: number: undefined`** Max options to render

- **`resetable: boolean: false`** Add delete button to reset value

- **`resetTo: array: []`** Value to be reset to

- **`shouldToggleOnHover: boolean: false`** Toggle drop-down on hover



#### Labels / Placeholders

---

- **`allSelectedLabel: string: 'All items are selected'`** Label for all selected items

- **`counterLabel: string: undefined`** Value Label for 'counter' mode

- **`searchPlaceholder: string: 'Search'`** Search field placeholder

- **`searchMorePlaceholder: string: 'Search to see more ...'`** If 'maxOptionsToRender' is defined

- **`selectAllLabel: string: 'Select All'`** Select All label

- **`valuePlaceholder: string: 'Select ...'`** Value placeholder



#### Events

---

- **`onBlur: function`** On Blur:

```code
onBlur(value) {
  // value - array of selected values, see 'value' property
}
```


- **`onChange: function`** On Change:

```code
onChange(value) {
  // value - array of selected values, see 'value' property
}
```


- **`onClose: function`** On Close:

```code
onClose(value) {
  // value - array of selected values, see 'value' property
}
```



#### Helpers

---

- **`filterOptions: function`** Filter / Search:

```code
filterOptions(options, text) {
  // options - see 'options' property
  // text - search string
  
  return - array of filtered options
}
```



#### Renderers

---

- **`ArrowRenderer: function`** DropDown Arrow:

```code
ArrowRenderer({options, value, expanded, hasFocus}) {
  // options: array - see 'options' prop 
  // value: array - see 'value' property
  // expanded: boolean - expanded component status
  // hasFocus: boolean - hasFocus component status
  
  return - component to render custom Arrow
}
```


- **`LoadingRenderer: function`** Loading Indicator:

```code
LoadingRenderer() {
  return - component to render custom Loading Indicator
}
```


- **`OptionRenderer: function`** Option:

```code
OptionRenderer({option, checked, disabled, onClick}) {
  // option: object - from options props: { value, label }  
  // checked: boolean - define if option is checked
  // disabled: boolean - disable option if component is disabled
  // onClick: function - notifies component about option click
  
  return - component to render custom Option
}
```


- **`TagRenderer: function`** Tag:

```code
TagRenderer({label, index, removableTag, onTagRemove}) {
  // label: string - tag label
  // index: number - tag index in array used in removal 
  // removableTag: boolean - display/hide remove tag button
  // onTagRemove: function - callback to remove selected tag
}
```


- **`ValueRenderer: function`** Value:

```code
ValueRenderer({value, options}) {
  // options: array - see 'options' property
  // value: array - see 'value' property
  
  return - component to render custom value
}
```
