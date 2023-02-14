import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { RootState } from './store';
import type { IAuthResponse as IReauthResponse } from 'types/authResponse';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { HttpCodes } from 'constant/httpCodes';
import { Messages } from 'constant/messages';
import { resetCredentionals, setCredentionals } from 'features/auth/authSlice';
import { showNotification } from 'features/notificator/notificatorSlice';
import { API } from './api';
import { BASE_URL } from 'constant/baseUrl';

const exeptionEndpoints = ['updatePhoto', 'uploadFile'];

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	mode: 'cors',
	credentials: 'include',
	prepareHeaders: (headers, { getState, endpoint }) => {
		const token = (getState() as RootState).auth.token;
		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}

		if (exeptionEndpoints.includes(endpoint)) {
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
					api.dispatch(setCredentionals(refreshResult.data as IReauthResponse));
					result = await baseQuery(args, api, extraOptions);
				} else {
					if (refreshResult.error?.status === HttpCodes.UNAUTHORZED) {
						api.dispatch(
							showNotification({
								message: Messages.AUTHORIZATION_TIMEOUT,
								type: 'error',
							})
						);
					} else if (refreshResult.error?.status === 'FETCH_ERROR') {
						api.dispatch(
							showNotification({
								message: Messages.ERROR_CONNECTION,
								type: 'error',
							})
						);
					}
					api.dispatch(resetCredentionals());
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
	refetchOnFocus: process.env.NODE_ENV !== 'development',
	refetchOnReconnect: process.env.NODE_ENV !== 'development',
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
