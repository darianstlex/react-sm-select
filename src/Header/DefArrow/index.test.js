import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { DefArrow } from './index';

describe('DefArrow', () => {
  it('should render properly', () => {
    const wrapper = shallow(
      <DefArrow
        expanded={true}
        disabled={true}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render properly if noe expanded - disables', () => {
    const wrapper = shallow(
      <DefArrow
        expanded={false}
        disabled={false}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
