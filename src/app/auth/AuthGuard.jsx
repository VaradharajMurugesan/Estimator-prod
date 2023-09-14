import useAuth from 'app/hooks/useAuth';
import { flat } from 'app/utils/utils';
import { Navigate, useLocation } from 'react-router-dom';
import AllPages from '../routes';

const userHasPermission = (pathname, user, routes) => {
  if (!user) {
    return false;
  }

  const matched = routes.find(
    (r) => r && r.path && pathname.includes(r.path.replace(/\/:\w+/, ''))
  );
  // const matched = routes.find((r) => r && r.path && r.path.replace(/\/:\w+/, '') === pathname);
  const authenticated =
    matched && matched.permission ? user.permissions.includes(matched.permission) : false;

  return authenticated;
};

const AuthGuard = ({ children }) => {
  let { isAuthenticated, user } = useAuth();
  const { pathname } = useLocation();
  const routes = flat(AllPages);
  const hasPermission = userHasPermission(pathname, user, routes);

  console.log(hasPermission);

  let authenticated = isAuthenticated && hasPermission;

  return (
    <>
      {authenticated ? (
        children
      ) : (
        <Navigate replace to="/session/signin" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
