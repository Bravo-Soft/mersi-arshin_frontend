import { AppRoutes } from 'constant/appRoutes';
import { useAuth } from 'hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

function AuthRouteChecker({ children }: { children: JSX.Element }): JSX.Element {
	const location = useLocation();
	const isAuth = useAuth();

	if (isAuth) {
		return <Navigate to={AppRoutes.HOME} state={{ from: location }} />;
	}
	return children;
}

export default AuthRouteChecker;
