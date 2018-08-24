### SandBox

```react
state: {
 value: ['red2', 'blue3'],
 options: [
   {value: 'red', label: 'Red'},
   {value: 'green', label: 'Green'},
   {value: 'blue', label: 'Blue'},
   {value: 'brown', label: 'Brown'},
   {value: 'red2', label: 'Red 2'},
   {value: 'green2', label: 'Green 2'},
   {value: 'blue2', label: 'Blue 2'},
   {value: 'brown2', label: 'Brown 2'},
   {value: 'red3', label: 'Red 3'},
   {value: 'green3', label: 'Green 3'},
   {value: 'blue3', label: 'Blue 3'},
   {value: 'brown3', label: 'Brown 3'},
 ],
}
---
<MultiSelect
  resetable
  resetTo={['red', 'blue']}
  enableSearch
  maxOptionsToRender={5}
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
/>
```