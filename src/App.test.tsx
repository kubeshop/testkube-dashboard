import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {render, screen} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './App';

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe('App component', () => {
  const queryClient = new QueryClient();

  test('renders learn react link', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    );

    expect(screen.getByTestId(/Test filters/i)).toBeInTheDocument();
  });
});
