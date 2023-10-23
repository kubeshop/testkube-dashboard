import * as Sentry from '@sentry/react';

import React, {useEffect, useRef} from 'react';

import {useRouterPlugin} from '@plugins/router/hooks';

import ErrorBoundaryFallback from './ErrorBoundaryFallback';

export default function ErrorBoundary({children}: {children: React.ReactNode}) {
  const {location} = useRouterPlugin.pick('location');
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
