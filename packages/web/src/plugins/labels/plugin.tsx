import {createPlugin} from '@testkube/plugins';

import RtkPlugin from '@plugins/rtk/plugin';

import {labelsApi} from '@services/labels';

export default createPlugin('oss/labels').init();

RtkPlugin.overlay.appendContext({labelsApi});
