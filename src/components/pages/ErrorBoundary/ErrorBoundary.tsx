import React, {useContext, useEffect, useState} from 'react';

import {MainContext} from '@contexts';

import ErrorBoundaryInner from './ErrorBoundaryInner';

export default function ErrorBoundary({children}: {children: React.ReactNode}) {
  const {location} = useContext(MainContext);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) {
      setHasError(false);
    }
  }, [location.key]);
  return (
    /**
     * NEW: The class component error boundary is now
     *      a child of the functional component.
     */
    <ErrorBoundaryInner hasError={hasError} setHasError={setHasError}>
      {children}
    </ErrorBoundaryInner>
  );
}
