### Loading Indicator

```react
<MultiSelect
  isLoading
  options={[]}
  value={[]}
  onChange={() => {}}
/>
```

### Custom Loading Indicator

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
const LoadingRenderer  = () => 'Loading ...';

<MultiSelect
  isLoading
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
  LoadingRenderer={LoadingRenderer}
/>
```
