### Basic Usage

```react
state: {
 options: [
   {value: 'red', label: 'Red'},
   {value: 'green', label: 'Green'},
   {value: 'blue', label: 'Blue'},
   {value: 'brown', label: 'Brown'},
 ],
}
---
<MultiSelect
  id="some-id"
  options={state.options}
  onChange={value => setState({ value })}
/>
```

### Without Select All

```react
state: {
 options: [
   {value: 'red', label: 'Red'},
   {value: 'green', label: 'Green'},
   {value: 'blue', label: 'Blue'},
   {value: 'brown', label: 'Brown'},
 ],
}
---
<MultiSelect
  id="some-id"
  hasSelectAll={false}
  options={state.options}
  onChange={value => setState({ value })}
/>
```

### Single Select

```react
state: {
 options: [
   {value: 'red', label: 'Red'},
   {value: 'green', label: 'Green'},
   {value: 'blue', label: 'Blue'},
   {value: 'brown', label: 'Brown'},
 ],
}
---
<MultiSelect
  hasSelectAll
  singleSelect
  options={state.options}
  onChange={value => setState({ value })}
/>
```

### Disabled

```react
state: {
 options: [
   {value: 'red', label: 'Red'},
   {value: 'green', label: 'Green'},
   {value: 'blue', label: 'Blue'},
   {value: 'brown', label: 'Brown'},
 ],
}
---
<MultiSelect
  disabled
  options={state.options}
  onChange={value => setState({ value })}
/>
```
