import {useEffect, useRef, useState} from 'react';
import {useEvent, useInterval} from 'react-use';

import {useTelemetry} from '@telemetry';

const useTrackTimeAnalytics = (type: string, condition = true) => {
  const [hidden, setHidden] = useState(document.hidden);
  const durationRef = useRef(0);
  const telemetry = useTelemetry();

  useEvent('visibilitychange', () => setHidden(document.hidden), document);

  const conditionalTrack = () => {
    if (condition && durationRef.current > 100) {
      telemetry.event('trackTime', {duration: durationRef.current, type});
    }
  };

  useInterval(() => {
    durationRef.current += 100;
  }, 100);

  useEffect(() => conditionalTrack, [condition]);

  useEffect(() => {
    if (hidden) {
      conditionalTrack();
    } else {
      durationRef.current = 0;
    }
  }, [hidden, condition]);
};

export default useTrackTimeAnalytics;
