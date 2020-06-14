import React from 'react';
import { shallow } from 'enzyme';
import NewRecipeForm from './NewRecipeForm';

describe('NewRecipeForm', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<NewRecipeForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
