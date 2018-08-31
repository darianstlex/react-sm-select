#### Controls

---

- **`mode: string: 'list'`** Behaviour mode: 'list', 'tags', 'counter', 'single'

- **`options: array`** Array of options to select from: **Required**

```code
lang: js
---
[
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' }
]
```


- **`value: array: []`** Array of preselected options:

```code
lang: js
---
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
lang: js
---
onBlur(value) {
  // value - array of selected values, see 'value' property
}
```


- **`onChange: function`** On Change:

```code
lang: js
---
onChange(value) {
  // value - array of selected values, see 'value' property
}
```


- **`onClose: function`** On Close:

```code
lang: js
---
onClose(value) {
  // value - array of selected values, see 'value' property
}
```



#### Helpers

---

- **`filterOptions: function`** Filter / Search:

```code
lang: js
---
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


- **`LoadingRenderer: function`** Loading Indicator:

```code
lang: js
---
LoadingRenderer() {
  return - component to render custom Loading Indicator
}
```


- **`OptionRenderer: function`** Option:

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


- **`TagRenderer: function`** Tag:

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


- **`ValueRenderer: function`** Value:

```code
lang: js
---
ValueRenderer({value, options}) {
  // options: array - see 'options' property
  // value: array - see 'value' property
  
  return - component to render custom value
}
```
