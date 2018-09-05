import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { DefLoading } from './index';

describe('DefLoading', () => {
  it('should render properly', () => {
    const wrapper = shallow(<DefLoading />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
