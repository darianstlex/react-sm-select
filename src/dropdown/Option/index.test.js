import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Option } from './index';

jest.mock('../../utils');

const methods = {
  onClick: jest.fn(),
};

describe('Option', () => {
  it('should render properly', () => {
    const wrapper = shallow(
      <Option
        option={{ value: 'one', label: 'One' }}
        checked={true}
        focused={true}
        isSingle={false}
        {...methods}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render not focused', () => {
    const wrapper = shallow(
      <Option
        option={{ value: 'one', label: 'One' }}
        checked={false}
        focused={false}
        isSingle={true}
        {...methods}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render properly with custom Option', () => {
    const wrapper = shallow(
      <Option
        Option={() => (<div>Custom Option</div>)}
        option={{ value: 'one', label: 'One' }}
        checked={true}
        focused={true}
        isSingle={false}
        {...methods}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('updateFocus should focus if focused', () => {
    const wrapper = shallow(
      <Option
        option={{ value: 'one', label: 'One' }}
        checked={true}
        focused={true}
        isSingle={false}
        {...methods}
      />
    );
    wrapper.instance().optionRef = {
      current: {
        focus: jest.fn(),
      }
    };
    wrapper.instance().updateFocus();

    expect(wrapper.instance().optionRef.current.focus).toHaveBeenCalled();
  });

  it('updateFocus should not focus if not focused', () => {
    const wrapper = shallow(
      <Option
        option={{ value: 'one', label: 'One' }}
        checked={true}
        focused={false}
        isSingle={false}
        {...methods}
      />
    );
    wrapper.instance().optionRef = {
      current: {
        focus: jest.fn(),
      }
    };
    wrapper.instance().updateFocus();

    expect(wrapper.instance().optionRef.current.focus).not.toHaveBeenCalled();
  });

  it('handleKeyDown should handle Enter press', () => {
    const wrapper = shallow(
      <Option
        option={{ value: 'one', label: 'One' }}
        checked={true}
        focused={false}
        isSingle={false}
        {...methods}
      />
    );
    wrapper.instance().handleKeyDown({ which: 13 });

    expect(methods.onClick).toHaveBeenCalled();
  });

  it('componentDidMount should call updateFocus', () => {
    const wrapper = shallow(
      <Option
        option={{ value: 'one', label: 'One' }}
        checked={true}
        focused={false}
        isSingle={false}
        {...methods}
      />
    );
    const updateFocus = jest.spyOn(wrapper.instance(), 'updateFocus');
    wrapper.instance().componentDidMount();

    expect(updateFocus).toHaveBeenCalled();
  });

  it('componentDidUpdate should call updateFocus', () => {
    const wrapper = shallow(
      <Option
        option={{ value: 'one', label: 'One' }}
        checked={true}
        focused={false}
        isSingle={false}
        {...methods}
      />
    );
    const updateFocus = jest.spyOn(wrapper.instance(), 'updateFocus');
    wrapper.instance().componentDidUpdate();

    expect(updateFocus).toHaveBeenCalled();
  });
});
