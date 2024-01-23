import {createDataPlugin} from '@testkube/plugins';

export interface OssConfig {
  pageTitle: string;
  slackUrl: string;
}

export default createDataPlugin<OssConfig>('dashboard/config')({
  pageTitle: 'Testkube',
  slackUrl: undefined,
});
