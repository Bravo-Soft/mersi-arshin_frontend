import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';
import { HttpCodes } from 'constant/httpCodes';
import { Messages } from 'constant/messages';
import { showNotification } from 'features/notificator/notificatorSlice';

interface IPhotoResponse {
	url: string;
}

const photoApiSlice = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: builder => ({
		getPhoto: builder.query<string, void>({
			queryFn: async (_arg, _api, _extraOptions, baseQuery) => {
				const response = await baseQuery({
					url: API.user.profile.photo,
				});

				if (response.error && response.error.status !== HttpCodes.NOT_FOUND)
					return { error: response.error };

				if (response.error?.status === HttpCodes.NOT_FOUND) return { data: '' };

				return { data: (response.data as IPhotoResponse).url };
			},
			providesTags: ['Photo'],
		}),
		updatePhoto: builder.mutation<void, FormData>({
			query: data => ({
				url: API.user.profile.photo,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Photo'],
			onQueryStarted: async (_arg, { queryFulfilled, dispatch }) => {
				try {
					await queryFulfilled;
					dispatch(
						showNotification({
							message: Messages.PHOTO_SUCCESSFULY_UPDATED,
							type: 'success',
						})
					);
				} catch {
					dispatch(
						showNotification({
							message: Messages.FAILED_TO_LOAD_PHOTO,
							type: 'error',
						})
					);
				}
			},
		}),
		deletePhoto: builder.mutation<void, void>({
			query: () => ({
				url: API.user.profile.photo,
				method: 'DELETE',
			}),
			onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
				try {
					await queryFulfilled;
					dispatch(
						showNotification({
							message: Messages.PHOTO_RESET,
							type: 'info',
						})
					);
				} catch {
					dispatch(
						showNotification({
							message: Messages.FAILED_TO_RESET_PHOTO,
							type: 'error',
						})
					);
				}
			},
			invalidatesTags: ['Photo'],
		}),
	}),
});

export const { useGetPhotoQuery, useUpdatePhotoMutation, useDeletePhotoMutation } = photoApiSlice;
