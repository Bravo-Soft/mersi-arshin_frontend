import { enqueueSnackbar } from 'notistack';

import { resetCredentials, setCredentials } from './authSlice';

import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';
import { Messages } from 'constant/messages';


export interface IAuthResponse {
	accessToken: string;
}

export interface IAuthFormRequest {
	email: string;
	password: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
	overrideExisting: false,
	endpoints: builder => ({
		login: builder.mutation<IAuthResponse, IAuthFormRequest>({
			query: data => ({
				url: API.auth.login,
				method: 'POST',
				body: data,
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;
				dispatch(setCredentials(data));
				enqueueSnackbar(Messages.WELCOME, { variant: 'success' });
			},
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: API.auth.logout,
				method: 'POST',
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					await queryFulfilled;
				} catch {
					enqueueSnackbar(Messages.ERROR_CONNECTION, { variant: 'error' });
				} finally {
					dispatch(resetCredentials());
				}
			},
		}),
		initSession: builder.query<IAuthResponse, void>({
			query: () => ({
				url: API.auth.refresh,
				method: 'POST',
			}),
		}),
	}),
});

export const { useLoginMutation, useLogoutMutation, useInitSessionQuery } = authApiSlice;
