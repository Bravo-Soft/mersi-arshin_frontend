import type { GridRowId } from '@mui/x-data-grid-pro';

import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';

export const favoritesApiSlice = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: builder => ({
		getAllFavoriteIds: builder.query<GridRowId[], void>({
			query: () => API.user.favorites,
			providesTags: ['Favorites'],
		}),

		createNewListFavoriteIds: builder.mutation<void, GridRowId[]>({
			query: list => ({
				url: API.user.favorites,
				method: 'POST',
				body: list,
			}),
			invalidatesTags: ['Favorites'],
		}),

		deleteFavoriteIds: builder.mutation<void, GridRowId[]>({
			query: list => ({
				url: API.user.favorites,
				method: 'DELETE',
				body: list,
			}),
			invalidatesTags: ['Favorites'],
		}),
	}),
});

export const {
	useGetAllFavoriteIdsQuery,
	useCreateNewListFavoriteIdsMutation,
	useDeleteFavoriteIdsMutation,
} = favoritesApiSlice;
