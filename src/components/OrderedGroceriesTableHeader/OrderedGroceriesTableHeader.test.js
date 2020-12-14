import React from 'react';
import { shallow } from 'enzyme';
import OrderedGroceriesTableHeader from './OrderedGroceriesTableHeader';

describe('OrderedGroceriesTableHeader', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<OrderedGroceriesTableHeader />);
    expect(wrapper).toMatchSnapshot();
  });
});
