import {FC, useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {DashboardContext} from '@contexts';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

interface DashboardRewriteProps {
  pattern: string;
  keepQuery?: boolean;
}

const DashboardRewrite: FC<DashboardRewriteProps> = ({pattern, keepQuery = false}) => {
  const {location} = useContext(DashboardContext);
  const params = useParams();
  const pathname = pattern.replace(/:([^/]+)/g, (_, key) => `${params[key]}`);
  const redirect = useDashboardNavigate(keepQuery ? {...location, pathname} : pathname, {replace: true});

  useEffect(redirect, [pattern, keepQuery]);

  return null;
};

export default DashboardRewrite;
