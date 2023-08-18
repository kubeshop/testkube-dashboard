import * as Sentry from '@sentry/react';

import React, {useContext, useEffect, useRef} from 'react';

import {DashboardContext} from '@contexts';

import ErrorBoundaryFallback from './ErrorBoundaryFallback';

export default function ErrorBoundary({children}: {children: React.ReactNode}) {
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
