import React from 'react';
import { render, cleanup } from '@testing-library/react-native';

import InboxPage from '..';

describe('<InboxPage />', () => {
  let rendered;
  beforeEach(() => {
    rendered = render(<InboxPage />);
  })

  afterEach(cleanup);

  it('should render correctly', () => {
    const tree = rendered.toJSON();
    expect(tree).toMatchSnapshot();
  });
});