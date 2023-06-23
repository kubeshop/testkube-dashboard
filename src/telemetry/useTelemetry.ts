import {useContext} from 'react';

import {TelemetryContext} from './TelemetryContext';
import {TelemetryService} from './TelemetryService';

const dummy = new TelemetryService({
  app: {name: 'dummy', version: 'dummy'},
});

export const useTelemetry = (): TelemetryService => {
  const {telemetry} = useContext(TelemetryContext);
  if (process.env.NODE_ENV === 'development' && !telemetry) {
    // eslint-disable-next-line no-console
    console.trace('useTelemetry used without the TelemetryProvider.');
  }
  return telemetry || dummy;
};
