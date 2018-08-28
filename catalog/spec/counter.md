### Counter

```react
state: {
 value: ['red'],
 options: [
   {value: 'red', label: 'Red'},
   {value: 'green', label: 'Green'},
   {value: 'blue', label: 'Blue'},
   {value: 'brown', label: 'Brown'},
 ],
}
---
<MultiSelect
  resetable
  mode="counter"
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
/>
```
