import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import useHistory from 'hooks/useHistory';

import Navigation from '..';

jest.mock('@expo/vector-icons');
let mockOpenURL = jest.fn();

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  canOpenURL: jest.fn(() => Promise.resolve(true)),
  openURL: mockOpenURL,
}));

jest.mock('hooks/useHistory');
jest.mock('hooks/useLoginStatus', () => {
  return jest.fn(() => true);
});

describe('<Navigation />', () => {
  let rendered, goTo;
  const testRoutes = [
    {
      name: "Example",
      path: 'example',
      icon: 'account-circle',
      show: true
    },
    {
      name: "External",
      icon: 'heart',
      external: 'https://google.com',
      show: true
    }
  ]

  beforeEach(() => {
    goTo = jest.fn();
    useHistory.mockImplementation(() => ({
      goTo
    }));

    rendered = render(<Navigation routes={testRoutes}/>);
  })

  afterEach(cleanup);

  it('should render correctly', () => {
    const tree = rendered.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render navigation buttons', () => {
    testRoutes.forEach((route) => {
      expect(rendered.queryByText(route.name)).toBeTruthy();
    })
  });

  it('should not render navigation buttons for routes with !show', () => {
    rendered = render(
      <Navigation 
        routes={[{
          name: "Example",
          path: 'example',
          icon: 'account-circle',
          show: false
        }]}
      />
    );
    expect(rendered.queryByText("Example")).toBeFalsy();
  });

  it('should navigate on button clicks', () => {
    const button = rendered.queryByText("Example");
    fireEvent.press(button);
    expect(goTo).toHaveBeenCalledWith('more/example');
  });

  it('should open link on button click', (done) => {
    const button = rendered.queryByText('External');
    fireEvent.press(button);
    setTimeout(() => {
      expect(mockOpenURL).toHaveBeenCalledWith('https://google.com');
      done();
    }, 100);
  });

});