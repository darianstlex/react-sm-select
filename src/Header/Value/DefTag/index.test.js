import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { DefTag } from './index';

const methods = {
  onTagRemove: jest.fn(),
};

describe('DefTag', () => {
  it('should render properly', () => {
    const wrapper = shallow(
      <DefTag
        label="One"
        index={2}
        removableTag={true}
        {...methods}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render properly without close', () => {
    const wrapper = shallow(
      <DefTag
        label="One"
        index={2}
        {...methods}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call onTagRemove on close click', () => {
    const wrapper = shallow(
      <DefTag
        label="One"
        index={2}
        removableTag={true}
        {...methods}
      />
    );
    wrapper.find('.Header__tag__close').prop('onClick')('event');
    expect(methods.onTagRemove).toHaveBeenCalledWith(2, 'event');
  });
});
