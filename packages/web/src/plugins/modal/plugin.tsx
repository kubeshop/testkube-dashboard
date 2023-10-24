import {createPlugin} from '@testkube/plugins';

import {ModalHandler, ModalOutletProvider} from '@modal/context';
import {useModal} from '@modal/hooks';

export default createPlugin('oss/modal')
  .order(1)
  .provider(<ModalHandler />)
  .provider(<ModalOutletProvider />)
  .data({useModal})
  .init();
