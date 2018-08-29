### Props

- **`id: string`** ID attribute of the container
- **`mode: string: list`** Behaviour mode: 'list', 'tags', 'counter', 'single'
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

- **`onBlur: function`** Function to be executed on blur:

```code
onBlur(value) {
  // value - array of selected values, see 'value' property
}
```

- **`resetTo: array: []`** Value to be reset to
- **`enableSearch: boolean: false`** Enables search field
- **`isLoading: boolean: false`** Shows loading indicator
- **`disabled: boolean: false`** Disable component
- **`hasSelectAll: boolean: false`** Shows 'Select All' options
- **`resetable: boolean: false`** Add clear button to reset value
- **`shouldToggleOnHover: boolean: false`** Toggle select drop-down on hover
- **`valuePlaceholder: string: 'Select ...'`** Provides custom placeholder for 'Select ...'
- **`counterLabel: string: 'Selected'`** Provides custom label for counter mode
- **`searchPlaceholder: string: 'Search'`** Search Field placeholder
- **`searchMorePlaceholder: string: 'Search to see more ...'`** Placeholder if 'maxOptionsToRender' is defined
- **`selectAllLabel: string: 'Select All'`** Provides custom label for 'Select All'
- **`allSelectedLabel: string: 'All items are selected'`** Provides custom label for all selected items
- **`maxOptionsToRender: number: undefined`** Maximum Options to render, but search over all

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

- **`TagRenderer: function`** Render custom Tag, shows in MultiSelect only

```code
lang: js
---
TagRenderer({label, index, removableTag, onTagRemove}) {
  // label: string - tag label
  // index: number - tag index in array used in removal 
  // removableTag: boolean - display/hide remove tag button
  // onTagRemove: function - callback to remove selected tag
}
```
