import { AppRoutes } from 'constant/appRoutes';
import { useGetUserDataQuery } from 'features/user/userApiSlice';
import { useAuth } from 'hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

interface IPrivateRouteProps {
	children: JSX.Element;
}

function PrivateRoute({ children }: IPrivateRouteProps): JSX.Element {
	const location = useLocation();
	const isAuth = useAuth();
	useGetUserDataQuery(undefined, { skip: !isAuth });

	if (!isAuth) {
		return <Navigate to={AppRoutes.AUTH} state={{ from: location }} />;
	}

	return children;
}

export default PrivateRoute;
