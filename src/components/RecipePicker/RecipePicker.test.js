import React from 'react';
import { shallow } from 'enzyme';
import RecipePicker from './RecipePicker';

describe('RecipePicker', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<RecipePicker />);
    expect(wrapper).toMatchSnapshot();
  });
});
