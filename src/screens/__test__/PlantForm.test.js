import React from 'react';
import renderer from 'react-test-renderer';

import PlantForm from '../components/PlantForm';

describe('<PlantForm />', () => {
  it('has 7 children', () => {
    const tree = renderer.create(<PlantForm initialValues={{}} />).toJSON();
    expect(tree.children.length).toBe(7);
  });

  it('renders correctly (add form)', () => {
    const tree = renderer.create(<PlantForm initialValues={{}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly (edit form)', () => {
    const tree = renderer.create(<PlantForm initialValues={{name: "test name", species: "test species", notes: ""}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});