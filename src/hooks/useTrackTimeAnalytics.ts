import {useCallback, useContext, useEffect, useRef, useState} from 'react';

import {AnalyticsContext} from '@contexts';

const useTrackTimeAnalytics = (type: string, condition = true) => {
  const analytics = useContext(AnalyticsContext);

  const [duration, setDuration] = useState(0);
  const durationRef = useRef(0);
  durationRef.current = duration;

  const trackConditionalDuration = () => {
    if (document.hidden) {
      if (condition) {
        trackDuration(duration);
      }
    } else {
      trackDuration(duration);
    }
  };

  const trackDuration = useCallback(
    (_duration: number) => {
      if (_duration > 100) {
        analytics.track(type, {
          duration: _duration,
        });
      }
    },
    [type]
  );

  useEffect(() => {
    let timer: any = null;

    timer = setInterval(() => {
      setDuration((curTime: number) => curTime + 100);
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    setDuration(0);
    return () => {
      if (condition) {
        trackDuration(durationRef.current);
      }
    };
  }, [condition]);

  useEffect(() => {
    if (document.hidden) {
      trackConditionalDuration();
    } else {
      setDuration(0);
    }
  }, [document.hidden]);
};

export default useTrackTimeAnalytics;
