import {useLayoutEffect, useState} from 'react';

import debounce from 'lodash/debounce';

import {size} from '@styles/MediaQueries';

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < size.tablet);
    };
    window.addEventListener('resize', debounce(updateSize, 250));

    return (): void => window.removeEventListener('resize', updateSize);
  }, []);

  return isMobile;
};

export default useIsMobile;
