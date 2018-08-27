### Opens on Hover

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
  shouldToggleOnHover={true}
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
/>
```
