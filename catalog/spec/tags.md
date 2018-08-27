### Tags

```react
state: {
 value: ['red', 'blue'],
 options: [
   {value: 'red', label: 'Red'},
   {value: 'green', label: 'Green'},
   {value: 'blue', label: 'Blue'},
   {value: 'brown', label: 'Brown'},
 ],
}
---
<MultiSelect
  valueAsTag
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
/>
```

### Tags without close button

```react
state: {
 value: ['blue', 'brown'],
 options: [
   {value: 'red', label: 'Red'},
   {value: 'green', label: 'Green'},
   {value: 'blue', label: 'Blue'},
   {value: 'brown', label: 'Brown'},
 ],
}
---
<MultiSelect
  valueAsTag
  removableTag={false}
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
/>
```
