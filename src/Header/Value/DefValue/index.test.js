import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { DefValue } from './index';

describe('DefValue', () => {
  it('should render properly', () => {
    const wrapper = shallow(
      <DefValue
        value={['one', 'two']}
        options={[{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }]}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
