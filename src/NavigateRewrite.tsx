import {FC} from 'react';
import {Navigate, useLocation, useParams} from 'react-router-dom';

interface NavigateRewriteProps {
  pattern: string;
  keepQuery?: boolean;
}

const NavigateRewrite: FC<NavigateRewriteProps> = ({pattern, keepQuery = false}) => {
  const params = useParams();
  const location = useLocation();
  const pathname = pattern.replace(/:([^/]+)/g, (_, key) => `${params[key]}`);

  return <Navigate replace to={keepQuery ? {...location, pathname} : pathname} />;
};

export default NavigateRewrite;
