import React from 'react';
import renderer from 'react-test-renderer';

import LoginScreen from '../LoginScreen';

describe('<LoginScreen />', () => {
  it('has 3 children', () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree.children.length).toBe(3);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});