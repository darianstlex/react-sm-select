import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { MODE } from '../../consts';

import { Value } from './index';
import { DefTag } from './DefTag';

const props = {
  mode: MODE.LIST,
  value: ['one'],
  options: [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
    { value: 'five', label: 'Five' },
  ],
  valuePlaceholder: 'Value Placeholder',
  allSelectedLabel: 'All are Selected',
  counterLabel: 'Counter Label',
  removableTag: true,
  onRemove: jest.fn(),
};

describe('Value', () => {
  it('should render properly default value', () => {
    const wrapper = shallow(<Value {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render properly custom value', () => {
    const wrapper = shallow(<Value {...props} Value={() => (<div />)}/>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render properly all selected', () => {
    const wrapper = shallow(<Value {...props} value={['one', 'two', 'five']}/>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Tags', () => {
    const wrapper = shallow(<Value {...props} mode={MODE.TAGS} value={['one', 'two', 'five']}/>);
    wrapper.find(DefTag).at(0).prop('onTagRemove')();

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(props.onRemove).toHaveBeenCalled();
  });

  it('should render Custom Tags', () => {
    const wrapper = shallow(
      <Value {...props} mode={MODE.TAGS} value={['one', 'two', 'five']} Tag={() => (<div />)}/>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Counter', () => {
    const wrapper = shallow(<Value {...props} mode={MODE.COUNTER} value={['one', 'two', 'five']}/>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
