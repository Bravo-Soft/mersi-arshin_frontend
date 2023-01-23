import { AppRoutes } from 'constant/appRoutes';
import { useAuth } from 'hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

interface IPreventNavigateAuthProps {
	children: JSX.Element;
}

function PreventNavigateAuth({ children }: IPreventNavigateAuthProps): JSX.Element {
	const isAuth = useAuth();
	const location = useLocation();

	if (isAuth && location.pathname.includes(AppRoutes.AUTH))
		return <Navigate to={AppRoutes.HOME} replace state={{ from: location }} />;

	return children;
}

export default PreventNavigateAuth;
