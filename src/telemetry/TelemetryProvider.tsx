import {FC, PropsWithChildren, useMemo} from 'react';

import {TelemetryContext} from './TelemetryContext';
import {TelemetryService, TelemetryServiceOptions} from './TelemetryService';

export const TelemetryProvider: FC<PropsWithChildren<TelemetryServiceOptions>> = ({children, ...options}) => {
  const value = useMemo(
    () => ({
      telemetry: new TelemetryService(options),
    }),
    []
  );

  return <TelemetryContext.Provider value={value}>{children}</TelemetryContext.Provider>;
};
