### Default

```react
state: {
 value: [],
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
  value={state.value}
  onChange={value => setState({ value })}
/>
```

### Disabled

```react
state: {
 value: ['brown', 'red'],
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
  value={state.value}
  onChange={value => setState({ value })}
/>
```

### With PreSelected Values and Resetable

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
  resetable
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
/>
```

### With Search and limit Options

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
enableSearch
  enableSearch
  maxOptionsToRender={5}
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
/>
```

### Emit changes OnClose

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
  onClose={value => setState({ value })}
/>
```

### With Search and custom Select All label

```react
state: {
 value: [],
 options: [
   {value: 'red', label: 'Red'},
   {value: 'green', label: 'Green'},
   {value: 'blue', label: 'Blue'},
   {value: 'brown', label: 'Brown'},
 ],
}
---
<MultiSelect
  enableSearch
  selectAllLabel="All Options"
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
/>
```

### Without Select All and opens on Hover

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
  hasSelectAll={false}
  shouldToggleOnHover={true}
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
/>
```

### With Loading Indicator

```react
<MultiSelect
  isLoading
  options={[]}
  value={[]}
  onChange={() => {}}
/>
```

### With Custom Loading Indicator

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
const LoadingRenderer  = () => 'Loading...';

<MultiSelect
  isLoading
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
  LoadingRenderer={LoadingRenderer}
/>
```

### With Custom Value

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


### With Custom DropDown Arrow

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

### With Custom Option

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

### Single Select Mode

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

### Single Select Mode with Search

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
  enableSearch
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
/>
```

### Single Select Mode OnClose with OnHover

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
  shouldToggleOnHover={true}
  options={state.options}
  value={state.value}
  onClose={value => setState({ value })}
/>
```

### Single Select Mode With Search and limit Options

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
  enableSearch
  singleSelect
  searchPlaceholder="Type something ..."
  maxOptionsToRender={5}
  options={state.options}
  value={state.value}
  onChange={value => setState({ value })}
/>
```
