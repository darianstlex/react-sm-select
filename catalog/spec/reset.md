### Reset (Clear)

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
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
/>
```

### Reset to Provided

```react
state: {
 value: ['green', 'red'],
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
  resetTo={['red']}
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
/>
```
