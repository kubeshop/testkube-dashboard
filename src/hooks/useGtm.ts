import GTM from 'react-gtm-module';

import env from '@src/env';

export const useGtm = () => {
  if (env.gtmKey) {
    GTM.initialize({gtmId: env.gtmKey});
  }
};
