import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { MODE } from './consts';

import { MultiSelect } from './index';

import * as utils from './utils';
jest.spyOn(utils, 'attachDocumentClickListener');
jest.spyOn(utils, 'removeDocumentClickListener');
jest.spyOn(utils, 'stopPreventPropagation');

const event = {
  stopPropagation: jest.fn(),
  preventDefault: jest.fn(),
};

const props = {
  // data
  id: 'ms-id',
  mode: MODE.LIST,
  options: [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
    { value: 'five', label: 'Five' },
  ],
  value: ['one'],
  resetTo: ['one'],
  maxOptionsToRender: 4,
  // methods
  onChange: jest.fn(),
  onBlur: jest.fn(),
  onClose: jest.fn(),
  // controls
  disabled: false,
  shouldToggleOnHover: false,
  isLoading: false,
  removableTag: true,
  resetable: true,
  enableSearch: true,
  hasSelectAll: true,
};

describe('MultiSelect', () => {
  it('should render properly', () => {
    const wrapper = shallow(<MultiSelect {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render properly with custom Loader', () => {
    const wrapper = shallow(<MultiSelect {...props} Loading={() => '...Loading'} isLoading={true} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render properly with custom Arrow', () => {
    const wrapper = shallow(<MultiSelect {...props} Arrow={() => 'Arrow'} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('isSingle should return correct value', () => {
    const wrapperMulti = shallow(<MultiSelect {...props} />);
    expect(wrapperMulti.instance().isSingle()).toBe(false);

    const wrapperSingle = shallow(<MultiSelect {...props} mode={MODE.SINGLE}/>);
    expect(wrapperSingle.instance().isSingle()).toBe(true);
  });

  it('should render properly expanded', () => {
    const wrapper = shallow(<MultiSelect {...props} />);
    wrapper.setState({ expanded: true });

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Methods', () => {
    let wrapper, toggleDropDown, clearValue, keyUp, keyDown, setState, onEvent, handleFocusControl, reset, select, deselect;
    beforeEach(() => {
      wrapper = shallow(<MultiSelect {...props} />);
      setState = jest.spyOn(wrapper.instance(), 'setState');
      onEvent = jest.spyOn(wrapper.instance(), 'onEvent');
      toggleDropDown = jest.spyOn(wrapper.instance(), 'toggleDropDown');
      clearValue = jest.spyOn(wrapper.instance(), 'clearValue');
      keyUp = jest.spyOn(wrapper.instance(), 'keyUp');
      keyDown = jest.spyOn(wrapper.instance(), 'keyDown');
      handleFocusControl = jest.spyOn(wrapper.instance(), 'handleFocusControl');
      reset = jest.spyOn(wrapper.instance(), 'reset');
      select = jest.spyOn(wrapper.instance(), 'select');
      deselect = jest.spyOn(wrapper.instance(), 'deselect');
    });
    afterEach(() => {
      toggleDropDown.mockClear();
      clearValue.mockClear();
      keyUp.mockClear();
      keyDown.mockClear();
      setState.mockClear();
      onEvent.mockClear();
      handleFocusControl.mockClear();
      reset.mockClear();
      select.mockClear();
      deselect.mockClear();
      utils.attachDocumentClickListener.mockClear();
      utils.removeDocumentClickListener.mockClear();
      utils.stopPreventPropagation.mockClear();
    });

    describe('componentDidUpdate', () => {
      it('should set new value if is different and call onChange', () => {
        wrapper.setProps({ value: ['one', 'two'] });
        expect(wrapper.state('value')).toEqual(['one', 'two']);
        expect(onEvent).toHaveBeenCalledWith('onChange');
      });

      it('should call setState with value if loading start', () => {
        wrapper.setProps({ isLoading: true });
        expect(setState).toHaveBeenCalledWith({ value: props.value });
      });

      it('should call setState with value if loading end', () => {
        wrapper.setProps({ isLoading: true });
        wrapper.setProps({ isLoading: false });
        expect(setState).toHaveBeenCalledWith({ value: props.value });
      });

      it('should call setState with value if options changes', () => {
        wrapper.setProps({ options: [{ value: 'one', label: 'One' }] });
        expect(setState).toHaveBeenCalledWith({ value: props.value });
      });

      it('should call onEvent with onClose if it closed', () => {
        wrapper.setState({ expanded: true });
        wrapper.setState({ expanded: false });
        expect(onEvent).toHaveBeenCalledWith('onClose');
      });

      it('should un/subscribe for click outside', () => {
        wrapper.setProps({ disabled: true });
        expect(wrapper.instance().hasListener).toBe(false);
        expect(utils.removeDocumentClickListener).toHaveBeenCalledWith(wrapper.instance().handleDocumentClick);

        wrapper.setProps({ disabled: false });
        expect(wrapper.instance().hasListener).toBe(true);
        expect(utils.attachDocumentClickListener).toHaveBeenCalledWith(wrapper.instance().handleDocumentClick);
      });
    });

    describe('componentWillUnmount', () => {
      it('should remove document click listener', () => {
        wrapper.instance().hasListener = true;
        wrapper.instance().componentWillUnmount();

        expect(utils.removeDocumentClickListener).toHaveBeenCalledWith(wrapper.instance().handleDocumentClick);
      });

      it('should not remove document click listener if not attached', () => {
        wrapper.instance().componentWillUnmount();

        expect(utils.removeDocumentClickListener).not.toHaveBeenCalled();
      });
    });

    describe('handleClick', () => {
      it('should attach document click listener', () => {
        wrapper.instance().handleClick();

        expect(utils.attachDocumentClickListener).toHaveBeenCalledWith(wrapper.instance().handleDocumentClick);
      });

      it('should not attach document click listener if its attached', () => {
        wrapper.instance().hasListener = true;
        wrapper.instance().handleClick();

        expect(utils.attachDocumentClickListener).not.toHaveBeenCalledWith(wrapper.instance().handleDocumentClick);
      });

      it('should not attach document click listener if disabled', () => {
        wrapper.setProps({ disabled: true });
        wrapper.instance().handleClick();

        expect(utils.attachDocumentClickListener).not.toHaveBeenCalledWith(wrapper.instance().handleDocumentClick);
      });
    });

    describe('handleDocumentClick', () => {
      it('should remove document click listener, set state and call onBlur', () => {
        wrapper.instance().handleDocumentClick({ path: ['test'] });

        expect(setState).toHaveBeenCalledWith({ expanded: false, hasFocus: false });
        expect(utils.removeDocumentClickListener).toHaveBeenCalledWith(wrapper.instance().handleDocumentClick);
        expect(onEvent).toHaveBeenCalledWith('onBlur');
      });

      it('should not remove document click listener, set state and call onBlur if click is internal', () => {
        wrapper.instance().multiSelectRef.current = 'test';
        wrapper.instance().handleDocumentClick({ path: ['test'] });

        expect(setState).not.toHaveBeenCalled();
        expect(utils.removeDocumentClickListener).not.toHaveBeenCalled();
        expect(onEvent).not.toHaveBeenCalled();
      });

      it('should not remove document click listener, set state and call onBlur if disabled', () => {
        const wrapper = shallow(<MultiSelect {...props} disabled={true} />);
        wrapper.instance().handleDocumentClick({ path: ['test'] });

        expect(setState).not.toHaveBeenCalled();
        expect(utils.removeDocumentClickListener).not.toHaveBeenCalled();
        expect(onEvent).not.toHaveBeenCalled();
      });
    });

    it('handleFocus should set focus state', () => {
      const wrapper = shallow(<MultiSelect {...props} />);
      wrapper.instance().handleFocus();

      expect(wrapper.state('hasFocus')).toBe(true);
    });

    it('handleBlur should set focus state', () => {
      const wrapper = shallow(<MultiSelect {...props} />);
      wrapper.instance().handleBlur();

      expect(wrapper.state('hasFocus')).toBe(false);
    });

    describe('toggleDropDown', () => {
      it('should call setState with proper data', () => {
        wrapper.instance().toggleDropDown();

        expect(setState.mock.calls[0][0]({ expanded: false })).toEqual({
          expanded: true,
          focusIndex: -1,
          searchText: '',
        });
      });

      it('should call setState with proper data if no search', () => {
        wrapper.setProps({ 'enableSearch': false });
        wrapper.instance().toggleDropDown();

        expect(setState.mock.calls[0][0]({ expanded: false })).toEqual({
          expanded: true,
          focusIndex: -2,
          searchText: '',
        });
      });

      it('should call setState with proper data if value is false', () => {
        wrapper.instance().toggleDropDown(false);

        expect(setState.mock.calls[0][0]({ expanded: true })).toEqual({ expanded: false });
      });

      it('should not call setState if disabled', () => {
        wrapper.setProps({ disabled: true });
        setState.mockClear();
        wrapper.instance().toggleDropDown();

        expect(setState).not.toHaveBeenCalled();
      });

      it('should not call setState if isLoading', () => {
        wrapper.setProps({ isLoading: true });
        setState.mockClear();
        wrapper.instance().toggleDropDown();

        expect(setState).not.toHaveBeenCalled();
      });
    });

    describe('handleHover', () => {
      it('should call toggleDropDown if shouldToggleOnHover', () => {
        wrapper.setProps({ shouldToggleOnHover: true });
        wrapper.instance().handleHover(true);

        expect(toggleDropDown).toHaveBeenCalledWith(true);
      });

      it('should not call toggleDropDown if not shouldToggleOnHover', () => {
        wrapper.instance().handleHover();

        expect(toggleDropDown).not.toHaveBeenCalled();
      });
    });

    describe('isSelectAllVisible', () => {
      it('should return true', () => {
        expect(wrapper.instance().isSelectAllVisible()).toBe(true);
      });

      it('should return false if not hasSelectAll', () => {
        wrapper.setProps({ hasSelectAll: false });

        expect(wrapper.instance().isSelectAllVisible()).toBe(false);
      });

      it('should return false if searchText', () => {
        wrapper.setState({ searchText: 'text' });

        expect(wrapper.instance().isSelectAllVisible()).toBe(false);
      });

      it('should return false if mode is Single', () => {
        wrapper.setProps({ mode: MODE.SINGLE });

        expect(wrapper.instance().isSelectAllVisible()).toBe(false);
      });
    });

    describe('handleFocusControl', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = shallow(<MultiSelect {...props} />);
        wrapper.instance().searchRef.current = {
          focus: jest.fn(),
        };
        wrapper.instance().headerRef.current = {
          focus: jest.fn(),
        };
      });

      it('should set focus on search', () => {
        wrapper.instance().handleFocusControl(-1);

        expect(wrapper.instance().searchRef.current.focus).toHaveBeenCalled();
        expect(wrapper.instance().headerRef.current.focus).not.toHaveBeenCalled();
      });

      it('should set focus on header', () => {
        wrapper.instance().handleFocusControl(-2);

        expect(wrapper.instance().searchRef.current.focus).not.toHaveBeenCalled();
        expect(wrapper.instance().headerRef.current.focus).toHaveBeenCalled();
      });

      it('should not set focus', () => {
        wrapper.instance().handleFocusControl(3);

        expect(wrapper.instance().searchRef.current.focus).not.toHaveBeenCalled();
        expect(wrapper.instance().headerRef.current.focus).not.toHaveBeenCalled();
      });
    });

    describe('keyDown', () => {
      it('should toggle DropDown and call stopPreventPropagation', () => {
        wrapper.instance().keyDown(event);

        expect(toggleDropDown).toHaveBeenCalledWith(true);
        expect(utils.stopPreventPropagation).toHaveBeenCalledWith(event);
      });

      it('should set new focusIndex and call handleFocusControl', () => {
        wrapper.setState({ expanded: true });
        wrapper.instance().keyDown(event);

        const focusIndex = wrapper.state('focusIndex');

        expect(setState).toHaveBeenCalled();
        expect(handleFocusControl).toHaveBeenCalledWith(focusIndex);
      });
    });

    describe('keyUp', () => {
      it('should toggle DropDown and call stopPreventPropagation', () => {
        wrapper.setState({ expanded: true, focusIndex: -2 });
        wrapper.instance().keyUp(event);

        expect(toggleDropDown).toHaveBeenCalledWith(false);
        expect(utils.stopPreventPropagation).toHaveBeenCalledWith(event);
      });

      it('should set new focusIndex and call handleFocusControl', () => {
        wrapper.setState({ expanded: true, focusIndex: 4 });
        wrapper.instance().keyDown(event);

        const focusIndex = wrapper.state('focusIndex');

        expect(setState).toHaveBeenCalled();
        expect(handleFocusControl).toHaveBeenCalledWith(focusIndex);
      });
    });

    describe('clearValue', () => {
      it('should call reset', () => {
        wrapper.setState({ focusIndex: -2 });
        wrapper.instance().clearValue(event);
        expect(reset).toHaveBeenCalledWith(event);
      });

      it('should not call reset if not resetable', () => {
        wrapper.setProps({ resetable: false });
        wrapper.setState({ focusIndex: -2 });
        wrapper.instance().clearValue();
        expect(reset).not.toHaveBeenCalled();
      });

      it('should not call reset if focusIndex is incorrect', () => {
        wrapper.setState({ focusIndex: 4 });
        wrapper.instance().clearValue();
        expect(reset).not.toHaveBeenCalled();
      });
    });

    describe('handleKeyPress', () => {
      it('should do correct calls', () => {
        wrapper.instance().headerRef.current = { focus: jest.fn() };

        wrapper.instance().handleKeyPress({ ...event, which: 8 });
        expect(clearValue).toHaveBeenCalledWith({ ...event, which: 8 });

        wrapper.instance().handleKeyPress({ ...event, which: 9 });
        expect(toggleDropDown).toHaveBeenCalledWith(false);

        wrapper.instance().handleKeyPress({ ...event, which: 27 });
        expect(toggleDropDown).toHaveBeenCalledWith(false);
        expect(wrapper.instance().headerRef.current.focus).toHaveBeenCalled();
        expect(utils.stopPreventPropagation).toHaveBeenCalledWith({ ...event, which: 27 });

        wrapper.instance().handleKeyPress({ ...event, which: 38 });
        expect(keyUp).toHaveBeenCalledWith({ ...event, which: 38 });

        wrapper.instance().handleKeyPress({ ...event, which: 40 });
        expect(keyDown).toHaveBeenCalledWith({ ...event, which: 40 });
      });
    });

    describe('select', () => {
      it('should set correct value in state', () => {
        wrapper.instance().select('two');

        expect(setState).toHaveBeenCalledWith({ value: ['one', 'two'] });
      });

      it('should set correct value in state if single', () => {
        wrapper.setProps({ mode: MODE.SINGLE });
        wrapper.instance().select('two');

        setState.mock.calls[0][1]();

        expect(setState.mock.calls[0][0]).toEqual({ value: ['two'] });
        expect(toggleDropDown).toHaveBeenCalledWith(false);
      });
    });

    describe('deselect', () => {
      it('should set correct value in state', () => {
        wrapper.setState({ value: ['one', 'two']});
        wrapper.instance().deselect(1);

        expect(setState).toHaveBeenCalledWith({ value: ['one'] });
        expect(utils.stopPreventPropagation).not.toHaveBeenCalled();
      });

      it('should set correct value in state and call stopPreventPropagation', () => {
        wrapper.setState({ value: ['one', 'two', 'five']});
        wrapper.instance().deselect(1, event);

        expect(setState).toHaveBeenCalledWith({ value: ['one', 'five'] });
        expect(utils.stopPreventPropagation).toHaveBeenCalledWith(event);
      });
    });

    describe('reset', () => {
      it('should reset value in state', () => {
        wrapper.instance().reset(event);

        expect(setState).toHaveBeenCalledWith({ value: props.resetTo });
        expect(utils.stopPreventPropagation).toHaveBeenCalledWith(event);
      });

      it('should not reset value if disabled', () => {
        const wrapper = shallow(<MultiSelect {...props} disabled={true}/>);
        wrapper.instance().reset(event);

        expect(setState).not.toHaveBeenCalled();
        expect(utils.stopPreventPropagation).toHaveBeenCalledWith(event);
      });

      it('should not reset value if isLoading', () => {
        const wrapper = shallow(<MultiSelect {...props} isLoading={true}/>);
        wrapper.instance().reset(event);

        expect(setState).not.toHaveBeenCalled();
        expect(utils.stopPreventPropagation).toHaveBeenCalledWith(event);
      });
    });

    describe('handleSearchChange', () => {
      it('should set search string', () => {
        wrapper.instance().handleSearchChange({ target: { value: 'text' } });

        expect(setState).toHaveBeenCalledWith({ searchText: 'text' });
      });
    });

    describe('allAreSelected', () => {
      it('should return false', () => {
        expect(wrapper.instance().allAreSelected()).toBe(false);
      });

      it('should return true', () => {
        wrapper.setState({ value: ['one', 'two', 'five'] });

        expect(wrapper.instance().allAreSelected()).toBe(true);
      });
    });

    describe('toggleAll', () => {
      it('should select all options', () => {
        wrapper.instance().toggleAll();

        expect(setState).toHaveBeenCalledWith({ focusIndex: 0, value: ['one', 'two', 'five']});
      });

      it('should deselect all options', () => {
        wrapper.setState({ value: ['one', 'two', 'five'] });
        wrapper.instance().toggleAll();

        expect(setState).toHaveBeenCalledWith({ focusIndex: 0, value: []});
      });
    });

    describe('filteredOptions', () => {
      it('should filter options', () => {
        wrapper.setState({ searchText: 'o'});

        expect(wrapper.instance().filteredOptions()).toEqual([
          { label: 'One', value: 'one' },
          { label: 'Two', value: 'two' },
        ]);
      });

      it('should filter options and limit', () => {
        wrapper.setProps({ maxOptionsToRender: 1 });
        wrapper.setState({ searchText: 'o'});

        expect(wrapper.instance().filteredOptions()).toEqual([{ label: 'One', value: 'one' } ]);
      });
    });

    describe('optionClick', () => {
      it('should call select and set focus', () => {
        wrapper.instance().optionClick('two', 4);

        expect(select).toHaveBeenCalledWith('two');
        expect(setState).toHaveBeenCalledWith({ focusIndex: 5 })
      });

      it('should call deselect and set focus', () => {
        wrapper.instance().optionClick('one', 4);

        expect(deselect).toHaveBeenCalledWith(0);
        expect(setState).toHaveBeenCalledWith({ focusIndex: 5 })
      });

      it('should call select if isSingle and set focus', () => {
        wrapper.setProps({ mode: MODE.SINGLE });
        wrapper.instance().optionClick('two', 4);

        expect(select).toHaveBeenCalledWith('two');
        expect(setState).toHaveBeenCalledWith({ focusIndex: 5 })
      });
    });

    describe('onEvent', () => {
      it('should call event', () => {
        wrapper.instance().onEvent('onChange');
        expect(props.onChange).toHaveBeenCalledWith(props.value);

        wrapper.instance().onEvent('onClose');
        expect(props.onClose).toHaveBeenCalledWith(props.value);

        wrapper.instance().onEvent('onBlur');
        expect(props.onBlur).toHaveBeenCalledWith(props.value);
      });
    });
  });
});
