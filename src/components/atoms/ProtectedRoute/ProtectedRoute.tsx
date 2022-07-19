import {Navigate, Outlet} from 'react-router-dom';

const ProtectedRoute: React.FC<{children: any}> = props => {
  const {children} = props;

  const isAuth = 1; // localStorage.getItem('isAuth');

  if (!Number(isAuth)) {
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
