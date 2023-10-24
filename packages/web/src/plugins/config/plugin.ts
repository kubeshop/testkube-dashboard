import {createDataPlugin} from '@testkube/plugins';

export interface OssConfig {
  pageTitle: string;
  discordUrl: string;
}

export default createDataPlugin<OssConfig>('oss/config')({
  pageTitle: 'Testkube',
  discordUrl: undefined,
});
