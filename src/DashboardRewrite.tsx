import {FC, useContext, useLayoutEffect} from 'react';
import {useParams} from 'react-router-dom';

import {DashboardContext} from '@contexts';

interface DashboardRewriteProps {
  pattern: string;
  keepQuery?: boolean;
}

const DashboardRewrite: FC<DashboardRewriteProps> = ({pattern, keepQuery = false}) => {
  const params = useParams();
  const pathname = pattern.replace(/:([^/]+)/g, (_, key) => `${params[key]}`);
  const {navigate, location} = useContext(DashboardContext);

  useLayoutEffect(() => {
    navigate(keepQuery ? {...location, pathname} : pathname, {replace: true});
  }, [pattern, keepQuery]);

  return null;
};

export default DashboardRewrite;
