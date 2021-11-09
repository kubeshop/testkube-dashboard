import React from 'react';
import {render, screen} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import App from './App';
import {store} from './redux/store';

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe('App', () => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        // eslint-disable-next-line
        addListener: function () {},
        // eslint-disable-next-line
        removeListener: function () {},
      };
    };

  test('renders learn react link', () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId(/Test filters/i)).toBeInTheDocument();
  });
});
