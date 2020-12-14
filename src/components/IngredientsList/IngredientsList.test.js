import React from 'react';
import { shallow } from 'enzyme';
import IngredientsList from './IngredientsList';

describe('IngredientsList', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<IngredientsList />);
    expect(wrapper).toMatchSnapshot();
  });
});
