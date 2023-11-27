import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { HttpCodes } from 'constant/httpCodes';
import { isFetchBaseQueryError } from 'guards/isFetchBaseQueryError';

export const useErrorMessage = (error?: FetchBaseQueryError | SerializedError) => {
	const defaultMessage = 'Что-то пошло не так';

	if (isFetchBaseQueryError(error)) {
		switch (error.status) {
			case HttpCodes.UNAUTHORIZED:
				return 'Неверный пароль';

			case HttpCodes.FORBIDDEN:
				return 'Данный пользователь забанен или не активирован';

			case HttpCodes.NOT_FOUND:
				return 'Пользователь не найден';

			case HttpCodes.TO_MANY_REQUESTS:
				return 'Слишком много попыток входа, подождите 10 сек.';

			case 'FETCH_ERROR':
				return 'Ошибка подключения к серверу, повторите попытку позже';

			default:
				return defaultMessage;
		}
	}
	return defaultMessage;
};
