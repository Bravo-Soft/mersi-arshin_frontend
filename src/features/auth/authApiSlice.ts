import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';
import { Messages } from 'constant/messages';
import { showNotification } from 'features/notificator/notificatorSlice';
import { resetCredentionals, setCredentionals } from './authSlice';

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
				dispatch(setCredentionals(data));
				dispatch(
					showNotification({
						message: Messages.WELCOME,
						type: 'success',
					})
				);
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
					dispatch(showNotification({ message: Messages.ERROR_CONNECTION, type: 'error' }));
				} finally {
					dispatch(resetCredentionals());
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
