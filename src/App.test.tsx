import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {render, screen} from '@testing-library/react';

import App from './App';

describe('App component', () => {
  const queryClient = new QueryClient();

  test('renders learn react link', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    expect(screen.getByTestId(/Test filters/i)).toBeInTheDocument();
  });
});
