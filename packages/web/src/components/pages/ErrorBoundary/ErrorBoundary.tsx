import * as Sentry from '@sentry/react';

import React, {useEffect, useRef} from 'react';

import ErrorBoundaryFallback from './ErrorBoundaryFallback';

export default function ErrorBoundary({children}: {children: React.ReactNode}) {
  const resetErrorRef = useRef<() => void>();

  useEffect(() => {
    resetErrorRef.current?.();
  }, [window.location.pathname]);

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
