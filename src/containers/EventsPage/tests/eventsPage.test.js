import React from 'react';
import { render, cleanup } from '@testing-library/react-native';

import EventsPage from '..';

describe('<EventsPage />', () => {
  let rendered;
  beforeEach(() => {
    rendered = render(<EventsPage />);
  })

  afterEach(cleanup);

  it('should render correctly', () => {
    const tree = rendered.toJSON();
    expect(tree).toMatchSnapshot();
  });
});