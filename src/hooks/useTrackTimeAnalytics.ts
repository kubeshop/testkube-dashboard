import {useContext, useEffect, useState} from 'react';
import {useEvent, useInterval, useLatest} from 'react-use';

import {AnalyticsContext} from '@contexts';

const useTrackTimeAnalytics = (type: string, condition = true) => {
  const {analyticsTrack} = useContext(AnalyticsContext);
  const [hidden, setHidden] = useState(document.hidden);
  const [duration, setDuration] = useState(0);
  const durationRef = useLatest(duration);

  useEvent('visibilitychange', () => setHidden(document.hidden), document);

  const conditionalTrack = () => {
    if (condition && durationRef.current > 100) {
      analyticsTrack('trackTime', {
        duration: durationRef.current,
        page: type,
      });
    }
  };

  useInterval(() => {
    setDuration((curTime: number) => curTime + 100);
  }, 100);

  useEffect(() => conditionalTrack, [condition]);

  useEffect(() => {
    if (hidden) {
      conditionalTrack();
    } else {
      setDuration(0);
    }
  }, [hidden, condition]);
};

export default process.env.NODE_ENV === 'development' ? () => {} : useTrackTimeAnalytics;
