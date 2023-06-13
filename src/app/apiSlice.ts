import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { RootState } from './store';
import type { IAuthResponse as IReauthResponse } from 'types/authResponse';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { HttpCodes } from 'constant/httpCodes';
import { Messages } from 'constant/messages';
import { resetCredentials, setCredentials } from 'features/auth/authSlice';
import { API } from './api';
import { BASE_URL } from 'constant/baseUrl';
import { enqueueSnackbar } from 'notistack';

const exceptionEndpoints = ['updatePhoto', 'uploadFile'];

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	mode: 'cors',
	credentials: 'include',
	prepareHeaders: (headers, { getState, endpoint }) => {
		const token = (getState() as RootState).auth.token;
		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}

		if (exceptionEndpoints.includes(endpoint)) {
			return headers;
		}

		headers.set('content-type', 'application/json; charset=utf-8');
		return headers;
	},
});

const mutex = new Mutex();

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions
) => {
	// mutex позволяет предотвратить множетсвенное обращение на обновление токена
	await mutex.waitForUnlock();
	let result = await baseQuery(args, api, extraOptions);
	if (result.error && result.error.status === HttpCodes.UNAUTHORZED && api.endpoint !== 'login') {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult = await baseQuery(
					{ url: API.auth.refresh, method: 'POST' },
					api,
					extraOptions
				);
				if (refreshResult.data) {
					api.dispatch(setCredentials(refreshResult.data as IReauthResponse));
					result = await baseQuery(args, api, extraOptions);
				} else {
					if (refreshResult.error?.status === HttpCodes.UNAUTHORZED) {
						enqueueSnackbar(Messages.AUTHORIZATION_TIMEOUT, { variant: 'error' });
					} else if (refreshResult.error?.status === 'FETCH_ERROR') {
						enqueueSnackbar(Messages.ERROR_CONNECTION, { variant: 'error' });
					}
					api.dispatch(resetCredentials());
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}
	return result;
};

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	tagTypes: [
		'Data',
		'User',
		'Photo',
		'Template',
		'Profile',
		'Notification',
		'Favorites',
		'PrintSettings',
	],
	endpoints: _ => ({}),
});
