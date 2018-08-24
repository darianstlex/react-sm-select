### Props

- **`id: string`** ID attribute of the container
- **`options: array`** Array of options to select from in format: **Required**

```code
lang: js
---
[
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' }
]
```

- **`value: array: []`** Array of preselected options in format:

```code
lang: js
---
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
- **`resetable: boolean: true`** Add clear button to reset value
- **`resetTo: array: []`** Value to be reseted to
- **`selectAllLabel: boolean: Select All`** Provides custom label for 'Select All'
- **`shouldToggleOnHover: boolean: false`** Toggle select drop-down on hover
- **`singleSelect: boolean: false`** Set component to behave as a single select
- **`maxOptionsToRender: number: undefined`** Maximum Options to render, but search over all
- **`filterOptions: function`** Custom filter function:

```code
lang: js
---
filterOptions(options, text) {
  // options - see 'options' property
  // text - search string
  
  return - array of filtered options
}
```

- **`ValueRenderer: function`** Render custom Value:

```code
lang: js
---
ValueRenderer({value, options}) {
  // options: array - see 'options' property
  // value: array - see 'value' property
  
  return - component to render custom value
}
```

- **`OptionRenderer: function`** Render custom Option

```code
lang: js
---
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
lang: js
---
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
lang: js
---
LoadingRenderer() {
  return - component to render custom Loading Indicator
}
```
