import React from 'react';

import ErrorBoundaryFallback from './ErrorBoundaryFallback';

type ErrorBoundaryInnerProps = {
  children: React.ReactNode;
  hasError: boolean;
  setHasError: (has: boolean) => void;
};

class ErrorBoundary extends React.Component<ErrorBoundaryInnerProps, {hasError: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }
  componentDidUpdate(prevProps: ErrorBoundaryInnerProps, _previousState: ErrorBoundaryInnerProps) {
    const {hasError} = this.props;
    if (!hasError && prevProps.hasError) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({hasError: false});
    }
  }

  componentDidCatch() {
    // You can also log the error to an error reporting service
    const {setHasError} = this.props;

    setHasError(true);
  }

  render() {
    const {hasError} = this.state;
    const {children} = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      return <ErrorBoundaryFallback />;
    }

    return children;
  }
}

export default ErrorBoundary;
