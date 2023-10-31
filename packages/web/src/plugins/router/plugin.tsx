import {Fragment, useEffect} from 'react';
import {Location, NavigateFunction} from 'react-router';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

import {config, createPlugin, data} from '@testkube/plugins';

import {useLastCallback} from '@hooks/useLastCallback';

import {ReactRouterLayer} from './components/ReactRouterLayer';

export default createPlugin('oss/router')
  .order(-10)

  .define(config<string>()('baseUrl'))
  .define(data<string>()('baseUrl'))
  .provider(<ReactRouterLayer />)

  // Scroll to top on a navigation to a new page
  .provider(tk => {
    const loc = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [loc.pathname]);
    return {type: Fragment, props: {}};
  })

  .define(data<Location>()('location'))
  .define(data<NavigateFunction>()('navigate'))
  .define(data<Record<string, string | undefined>>()('params'))

  .provider(tk => {
    tk.data.navigate = useLastCallback(useNavigate());
    tk.data.location = useLocation();
    tk.data.params = useParams();
    return {type: Fragment, props: {}};
  })

  .init((tk, cfg) => {
    tk.data.baseUrl = cfg.baseUrl;
  });
