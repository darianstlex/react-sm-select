import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Counter } from './index';

describe('Counter', () => {
  it('should render properly', () => {
    const wrapper = shallow(
      <Counter
        valuePlaceholder="Some Placeholder"
        counterLabel="Counter Label"
        value={['one']}
        options={[{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }]}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render properly if all selected', () => {
    const wrapper = shallow(
      <Counter
        valuePlaceholder="Some Placeholder"
        counterLabel="Counter Label"
        value={['one', 'two']}
        options={[{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }]}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render properly if no counterLabel', () => {
    const wrapper = shallow(
      <Counter
        valuePlaceholder="Some Placeholder"
        value={['one', 'two']}
        options={[{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }]}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
