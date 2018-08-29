> Single/Multi Select React Component

Inspired by [React MultiSelect](https://github.com/Khan/react-multi-select)

## Installation

Install the react-sm-select npm package:

```code
npm install react-sm-select
```

### Usage

```code
import { MultiSelect } from 'react-sm-select';
import 'react-sm-select/dist/styles.css';

.........

state = {
  options: [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' }
  ],
  value: ['blue']
}

.........

<MultiSelect
  id="some-id"
  options={this.state.options}
  value={this.state.value}
  onChange={value => this.setState({ value })}
/>
```

### Styling

Can be used css overriding, see compiled css. Or use scss variables for general styling.

```code
@import 'react-sm-select/dist/variables';

$SM-textColor: #333;
$SM-itemTextColor: #666666;
$SM-itemHoverColor: #ebf5ff;
$SM-mutedColor: #aaa;
$SM-backgroundColor: #fff;
$SM-dividerColor: #cfd4d9;
$SM-focusColor: #1298d4;
$SM-borderColor: $SM-mutedColor;
$SM-searchPlaceholderColor: $SM-mutedColor;
$SM-tagColor: #fff;
$SM-tagBackgroundColor: $SM-focusColor;
$SM-tagCloseColor: $SM-textColor;
$SM-tagCloseBackgroundColor: #d1d1d1;
$SM-counterColor: $SM-focusColor;
$SM-selectAllColor: $SM-itemTextColor;
$SM-fieldHeight: 40px;
$SM-dropDownHeight: 300px;
$SM-borderRadius: 5px;
$SM-tagBorderRadius: 3px;

@import 'react-sm-select/dist/main';
```
