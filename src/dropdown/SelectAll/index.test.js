import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { SelectAll } from './index';

describe('SelectAll', () => {
  it('should render properly', () => {
    const wrapper = shallow(
      <SelectAll
        option={{ label: 'One', value: 'one' }}
        checked={true}
        focused={true}
        onClick={() => {}}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
