import React from 'react';
import { render, cleanup } from '@testing-library/react-native';

import HomePage from '..';

describe('<HomePage />', () => {
  let rendered;
  beforeEach(() => {
    rendered = render(<HomePage />);
  })

  afterEach(cleanup);

  it('should render correctly', () => {
    const tree = rendered.toJSON();
    expect(tree).toMatchSnapshot();
  });
});