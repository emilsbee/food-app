import React from 'react';
import { shallow } from 'enzyme';
import OrderedGroceriesNavBar from './OrderedGroceriesNavBar';

describe('OrderedGroceriesNavBar', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<OrderedGroceriesNavBar />);
    expect(wrapper).toMatchSnapshot();
  });
});
