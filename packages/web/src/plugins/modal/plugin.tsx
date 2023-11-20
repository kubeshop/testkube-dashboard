import {createPlugin} from '@testkube/plugins';

import {ModalHandler, ModalOutletProvider} from '@modal/context';
import {useModal} from '@modal/hooks';

export default createPlugin('oss/modal')
  .order(-Infinity)
  .provider(<ModalHandler />, {order: -1000})
  .provider(<ModalOutletProvider />, {order: 100})
  .data({useModal})
  .init();
