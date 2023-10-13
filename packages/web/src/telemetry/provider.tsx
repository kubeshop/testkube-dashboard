import {FC, PropsWithChildren, useMemo} from 'react';

import {TelemetryService, TelemetryServiceOptions} from './TelemetryService';
import {TelemetryContext} from './context';

export const TelemetryProvider: FC<PropsWithChildren<TelemetryServiceOptions>> = ({children, ...options}) => {
  const value = useMemo(
    () => ({
      telemetry: new TelemetryService(options),
    }),
    []
  );

  return <TelemetryContext.Provider value={value}>{children}</TelemetryContext.Provider>;
};
