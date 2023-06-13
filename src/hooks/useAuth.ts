import { selectToken } from '../features/auth/authSlice';

import { useAppSelector } from 'hooks/redux';

const isJwtToken = (token: string) => token.split('.').length === 3;

/**
 * @returns Хук возвращает `true`, если в хранилище есть токен авторизации
 */
export const useAuth = () => {
	const token = useAppSelector(selectToken);

	if (token === null) return false;

	return isJwtToken(token);
};
