import React from 'react';
import { shallow } from 'enzyme';
import YearDropdown from './YearDropdown';

describe('YearDropdown', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<YearDropdown />);
    expect(wrapper).toMatchSnapshot();
  });
});
