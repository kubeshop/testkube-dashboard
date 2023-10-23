import {Location, NavigateFunction} from 'react-router';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

import {createPlugin, data} from '@testkube/plugins';

import env from '@env';

import {useLastCallback} from '@hooks/useLastCallback';

import {ReactRouterLayer} from './components/ReactRouterLayer';

export default createPlugin('oss/router')
  .order(-10)

  // TODO: Pass base url from outside (Cloud)
  .data({baseUrl: env.basename || ''})
  .provider(tk => <ReactRouterLayer basename={tk.data.baseUrl} />)

  .define(data<Location>()('location'))
  .define(data<NavigateFunction>()('navigate'))
  .define(data<Record<string, string | undefined>>()('params'))

  .init(tk => {
    tk.sync(() => {
      tk.data.navigate = useLastCallback(useNavigate());
      tk.data.location = useLocation();
      tk.data.params = useParams();
    });
  });
