import {useWindowSize} from 'react-use';

import {size} from '@styles/MediaQueries';

export const useIsMobile = (): boolean => {
  const {width} = useWindowSize();
  return width < size.tablet;
};
