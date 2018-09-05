import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { DefOption } from './index';

describe('DefOption', () => {
  it('should render properly', () => {
    const wrapper = shallow(
      <DefOption
        checked={true}
        option={{ value: 'one', label: 'One' }}
        isSingle={false}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render properly in Single mode', () => {
    const wrapper = shallow(
      <DefOption
        checked={false}
        option={{ value: 'one', label: 'One' }}
        isSingle={true}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
