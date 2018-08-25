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
const LoadingRenderer  = () => 'Loading ...';

<MultiSelect
  isLoading
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
  LoadingRenderer={LoadingRenderer}
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
const ValueRenderer = ({value, options}) => {
  if(!value.length) return 'Colors';
  return `Colors (${!!value.length && value.length === options.length ? 'All' : value.length})`;
};

<MultiSelect
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
  ValueRenderer={ValueRenderer}
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
const ArrowRenderer = ({expanded}) => {
  return expanded ? String.fromCharCode(0x027F0) : String.fromCharCode(0x027F1);
};

<MultiSelect
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
  ArrowRenderer={ArrowRenderer}
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
const OptionRenderer = ({checked, option, disabled, onClick }) => (
  <span className="SelectItem__renderer">
    <input
      type="checkbox"
      onChange={onClick}
      checked={checked}
      tabIndex="-1"
      disabled={disabled}
    />
    <span className="SelectItem__label">
      {option.label}
    </span>
  </span>
);

<MultiSelect
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
  OptionRenderer={OptionRenderer}
/>
```