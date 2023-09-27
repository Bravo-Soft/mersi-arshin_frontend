import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';

export function PrivateRoute({ children }: Record<'children', JSX.Element>) {
	const isAuth = useAuth();
	const location = useLocation();

	if (!isAuth) {
		return <Navigate to={'/'} replace state={{ returnUrl: location.pathname }} />;
	}

	return children;
}
