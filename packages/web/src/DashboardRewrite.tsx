import {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {useRouterPlugin} from '@plugins/router/hooks';

interface DashboardRewriteProps {
  pattern: string;
  keepQuery?: boolean;
}

const DashboardRewrite: FC<DashboardRewriteProps> = ({pattern, keepQuery = false}) => {
  const location = useRouterPlugin.select(x => x.location);
  const params = useParams();
  const pathname = pattern.replace(/:([^/]+)/g, (_, key) => `${params[key]}`);
  const redirect = useDashboardNavigate(keepQuery ? {...location, pathname} : pathname, {replace: true});

  useEffect(redirect, [pattern, keepQuery]);

  return null;
};

export default DashboardRewrite;
