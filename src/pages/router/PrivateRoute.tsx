import { Navigate } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';

export function PrivateRoute({ children }: Record<'children', JSX.Element>) {
	const isAuth = useAuth();

	if (isAuth) {
		return children;
	}

	return <Navigate to='/' replace />;
}
