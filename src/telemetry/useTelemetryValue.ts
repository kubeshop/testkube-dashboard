import {useEffect, useRef} from 'react';

import {DataLayerValue} from './TelemetryService';
import {useTelemetry} from './useTelemetry';

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
