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

$SM-white: #fff;
$SM-brightGrey: #ebf5ff;
$SM-lightGrey: #cfd4d9;
$SM-lightBlue: #1298d4;
$SM-grey: #949ca6;
$SM-darkBlue: #143154;

// General Colors
$SM-backgroundColor: $SM-white;
$SM-focusColor: $SM-lightBlue;
$SM-mutedColor: $SM-grey;
$SM-borderColor: $SM-grey;
$SM-textColor: $SM-darkBlue;

// Value Colors
$SM-valueColor: $SM-textColor;
$SM-valuePlaceholderColor: $SM-mutedColor;
$SM-counterColor: $SM-focusColor;

$SM-tagColor: $SM-white;
$SM-tagBackgroundColor: $SM-focusColor;
$SM-tagCloseColor: $SM-textColor;
$SM-tagCloseBackgroundColor: $SM-lightGrey;

// Search Colors
$SM-searchPlaceholderColor: $SM-mutedColor;

// Option Colors
$SM-itemTextColor: $SM-textColor;
$SM-itemBackgroundHoverColor: $SM-brightGrey;
$SM-dividerColor: $SM-lightGrey;
$SM-selectAllColor: $SM-itemTextColor;

// Size
$SM-fieldHeight: 42px;
$SM-itemHeight: $SM-fieldHeight - 4px;
$SM-borderRadius: 5px;
$SM-tagBorderRadius: 3px;
$SM-dropDownHeight: 300px;

// Other
$SM-dropDownZIndex: 1;

@import 'react-sm-select/dist/main';
```
