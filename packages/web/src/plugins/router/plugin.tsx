import {useEffect} from 'react';
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
  .provider(() => {
    const loc = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [loc.pathname]);
  })

  .define(data<Location>()('location'))
  .define(data<NavigateFunction>()('navigate'))
  .define(data<Record<string, string | undefined>>()('params'))

  .provider(({scope}) => {
    scope.data.navigate = useLastCallback(useNavigate());
    scope.data.location = useLocation();
    scope.data.params = useParams();
  })

  .init((tk, cfg) => {
    tk.data.baseUrl = cfg.baseUrl;
  });
