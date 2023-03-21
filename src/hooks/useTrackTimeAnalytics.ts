import {useContext, useEffect, useRef, useState} from 'react';
import {useEvent, useInterval} from 'react-use';

import {AnalyticsContext} from '@contexts';

const useTrackTimeAnalytics = (type: string, condition = true) => {
  const {analyticsTrack} = useContext(AnalyticsContext);
  const [hidden, setHidden] = useState(document.hidden);
  const durationRef = useRef(0);

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

export default process.env.NODE_ENV === 'development' ? () => {} : useTrackTimeAnalytics;
