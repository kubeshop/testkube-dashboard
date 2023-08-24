import {useContext, useEffect, useRef} from 'react';

import {DataLayerValue, TelemetryService} from './TelemetryService';
import {TelemetryContext} from './context';

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

export const useTelemetryValue = (key: string, value: DataLayerValue, ignoreEmpty = false): void => {
  const telemetry = useTelemetry();
  const prevValue = useRef<DataLayerValue>(undefined);
  const prevDisabled = useRef<boolean>(telemetry.disabled);

  function update() {
    if (
      !telemetry.disabled &&
      (value !== prevValue.current || prevDisabled.current) &&
      (!ignoreEmpty || value != null)
    ) {
      telemetry.set({[key]: value});
    }
    prevDisabled.current = telemetry.disabled;
    prevValue.current = value;
  }

  update();

  const unsubscribe = telemetry.onStatusChange(update);
  useEffect(() => unsubscribe, []);
};
