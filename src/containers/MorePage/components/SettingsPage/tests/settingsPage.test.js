import React from 'react';
import { render, cleanup } from '@testing-library/react-native';

import SettingsPage from '..';

describe('<SettingsPage />', () => {
  let rendered;
  beforeEach(() => {
    rendered = render(<SettingsPage />);
  })

  afterEach(cleanup);

  it('should render correctly', () => {
    const tree = rendered.toJSON();
    expect(tree).toMatchSnapshot();
  });
});