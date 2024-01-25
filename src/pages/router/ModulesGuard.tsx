import { Navigate } from 'react-router-dom';

import { useGetUserDataQuery } from 'features/user/userApiSlice';
import { useAuth } from 'hooks/useAuth';

export function ModulesGuard({ children }: Record<'children', JSX.Element>) {
	const isAuth = useAuth();

	useGetUserDataQuery(undefined, { skip: isAuth });

	if (!isAuth) {
		return <Navigate to='/' replace state={{ returnUrl: location.pathname }} />;
	}

	return children;
}
