import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppRoutes } from 'constant/appRoutes';
import { useInitSessionQuery } from 'features/auth/authApiSlice';

export const useInitializeSession = () => {
	const { isSuccess, isError } = useInitSessionQuery();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (isSuccess) {
			navigate(location.state?.returnUrl ?? AppRoutes.HOME, { replace: true });
		}
	}, [isSuccess, location.state?.returnUrl, navigate]);

	useEffect(() => {
		if (isError) {
			navigate(AppRoutes.AUTH, { replace: true });
		}
	}, [isError, navigate]);
};
