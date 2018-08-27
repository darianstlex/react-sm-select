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
@import 'react-sm-select/scss/variables';

$MS-backgroundColor: #fff;
$MS-focusColor: #1298d4;
$MS-fieldHeight: 40px;
$MS-borderRadius: 5px;
$MS-dividerColor: #cfd4d9;
$MS-borderColor: #aaa;
$MS-textColor: #333;
$MS-itemTextColor: #666666;
$MS-itemHoverColor: #ebf5ff;
$MS-searchPlaceholderColor: #c7c7c7;
$MS-dropDownHeight: 300px;
$MS-tagBackgroundColor: $MS-focusColor;
$MS-tagColor: #fff;
$MS-tagCloseBackgroundColor: #d1d1d1;
$MS-tagCloseColor: $MS-textColor;
$MS-tagBorderRadius: 3px;

@import 'react-sm-select/scss/main';
```
