import {FC, useContext, useLayoutEffect} from 'react';
import {useParams} from 'react-router-dom';

import {DashboardContext} from '@contexts/DashboardContext';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

interface DashboardRewriteProps {
  pattern: string;
  keepQuery?: boolean;
}

export const DashboardRewrite: FC<DashboardRewriteProps> = ({pattern, keepQuery = false}) => {
  const {location} = useContext(DashboardContext);
  const params = useParams();
  const pathname = pattern.replace(/:([^/]+)/g, (_, key) => `${params[key]}`);
  const redirect = useDashboardNavigate(keepQuery ? {...location, pathname} : pathname, {replace: true});

  useLayoutEffect(redirect, [pattern, keepQuery]);

  return null;
};
