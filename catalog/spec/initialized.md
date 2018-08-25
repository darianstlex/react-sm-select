### PreSelected Value

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
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
/>
```

### Single Select PreSelected

```react
state: {
 value: ['blue'],
 options: [
   {value: 'red', label: 'Red'},
   {value: 'green', label: 'Green'},
   {value: 'blue', label: 'Blue'},
   {value: 'brown', label: 'Brown'},
 ],
}
---
<MultiSelect
  singleSelect
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
/>
```