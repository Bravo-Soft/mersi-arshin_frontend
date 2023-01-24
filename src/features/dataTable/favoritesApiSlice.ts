import type { GridRowId } from '@mui/x-data-grid-pro';

import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';

export const favoritesApiSlice = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: builder => ({
		createNewListFavoriteIds: builder.mutation<void, GridRowId[]>({
			query: list => ({
				url: API.user.favoritesData,
				method: 'POST',
				body: list,
			}),
			invalidatesTags: ['Data'],
		}),

		deleteFavoriteIds: builder.mutation<void, GridRowId[]>({
			query: list => ({
				url: API.user.favoritesData,
				method: 'DELETE',
				body: list,
			}),
			invalidatesTags: ['Data'],
		}),
	}),
});

export const { useCreateNewListFavoriteIdsMutation, useDeleteFavoriteIdsMutation } =
	favoritesApiSlice;
