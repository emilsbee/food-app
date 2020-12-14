import React from 'react';
import { shallow } from 'enzyme';
import MainDashboardNavBarTotal from './MainDashboardNavBarTotal';

describe('MainDashboardNavBarTotal', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<MainDashboardNavBarTotal />);
    expect(wrapper).toMatchSnapshot();
  });
});
