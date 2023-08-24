import * as Sentry from '@sentry/react';

import {ReactNode, useContext, useEffect, useRef} from 'react';

import {DashboardContext} from '@contexts/DashboardContext';

import {ErrorBoundaryFallback} from './ErrorBoundary/ErrorBoundaryFallback';

export function ErrorBoundary({children}: {children: ReactNode}) {
  const {location} = useContext(DashboardContext);
  const resetErrorRef = useRef<() => void>();

  useEffect(() => {
    resetErrorRef.current?.();
  }, [location.key]);

  return (
    <Sentry.ErrorBoundary
      fallback={({resetError}) => {
        resetErrorRef.current = resetError;
        return <ErrorBoundaryFallback />;
      }}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}
