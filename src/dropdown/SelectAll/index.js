import React from 'react';
import { Option } from '../Option';

export const SelectAll = p => (
  <li className="OptionList__item DropDown__selectAll">
    <Option
      Option={p.Option}
      option={{
        label: p.selectAllLabel,
        value: '',
      }}
      checked={p.checked}
      focused={p.focused}
      onClick={p.onClick}
    />
  </li>
);
