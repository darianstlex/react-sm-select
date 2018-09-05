import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Header } from './index';

describe('Header', () => {
  it('should render properly', () => {
    const wrapper = shallow(
      <Header
        disabled={false}
        expanded={true}
        focused={true}
        selected={true}
      >
        <div>Some Children</div>
      </Header>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render properly if disabled and not focused', () => {
    const wrapper = shallow(
      <Header
        disabled={true}
        expanded={false}
        focused={false}
        selected={false}
      >
        <div>Some Children</div>
      </Header>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render properly if disabled and focused', () => {
    const wrapper = shallow(
      <Header
        disabled={true}
        expanded={false}
        focused={true}
        selected={false}
      >
        <div>Some Children</div>
      </Header>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render properly if enabled, selected and focused', () => {
    const wrapper = shallow(
      <Header
        disabled={false}
        expanded={false}
        focused={true}
        selected={true}
      >
        <div>Some Children</div>
      </Header>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
