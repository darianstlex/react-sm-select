### Loading Indicator

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
const Loading  = () => 'Loading ...';

<MultiSelect
  isLoading
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
  Loading={Loading}
/>
```

### Value

```react
state: {
 value: ['red', 'blue', 'black'],
 options: [
   {value: 'red', label: 'Red'},
   {value: 'green', label: 'Green'},
   {value: 'blue', label: 'Blue'},
   {value: 'brown', label: 'Brown'},
 ],
}
---
const Value = ({value, options}) => {
  if(!value.length) return 'Colors';
  return `Colors (${!!value.length && value.length === options.length ? 'All' : value.length})`;
};

<MultiSelect
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
  Value={Value}
/>
```


### DropDown Arrow

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
const Arrow = ({expanded}) => {
  return expanded ? String.fromCharCode(0x027F0) : String.fromCharCode(0x027F1);
};

<MultiSelect
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
  Arrow={Arrow}
/>
```

### Option

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
const Option = ({checked, option, isSingle}) => (
  <div className="Option__renderer">
    {!isSingle && <input
      type="checkbox"
      defaultChecked={checked}
      tabIndex="-1"
    />}
    <span className="Option__label">
      {option.label}
    </span>
  </div>
);

<MultiSelect
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
  Option={Option}
/>
```
