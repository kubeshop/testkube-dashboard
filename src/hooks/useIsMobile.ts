import {useWindowSize} from 'react-use';

import {size} from '@styles/MediaQueries';

const useIsMobile = (): boolean => {
  const { width } = useWindowSize();
  return width < size.tablet;
};

export default useIsMobile;
