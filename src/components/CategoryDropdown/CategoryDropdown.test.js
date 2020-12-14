import React from 'react';
import { shallow } from 'enzyme';
import CategoryDropdown from './CategoryDropdown';

describe('CategoryDropdown', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<CategoryDropdown />);
    expect(wrapper).toMatchSnapshot();
  });
});
