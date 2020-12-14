import React from 'react';
import { shallow } from 'enzyme';
import WeekDropdown from './WeekDropdown';

describe('WeekDropdown', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<WeekDropdown />);
    expect(wrapper).toMatchSnapshot();
  });
});
