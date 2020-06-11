import React from 'react';
import { shallow } from 'enzyme';
import MainDashboardGroceryTable from './MainDashboardGroceryTable';

describe('MainDashboardGroceryTable', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<MainDashboardGroceryTable />);
    expect(wrapper).toMatchSnapshot();
  });
});
