import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from 'constant/appRoutes';
import { useInitSessionQuery } from 'features/auth/authApiSlice';

export const useInitializeSession = () => {
	const { isSuccess, isError } = useInitSessionQuery();
	const navigate = useNavigate();

	useEffect(() => {
		if (isSuccess) {
			navigate(AppRoutes.HOME, { replace: true });
		}
	}, [isSuccess, navigate]);

	useEffect(() => {
		if (isError) {
			navigate(AppRoutes.AUTH, { replace: true });
		}
	}, [isError, navigate]);
};
