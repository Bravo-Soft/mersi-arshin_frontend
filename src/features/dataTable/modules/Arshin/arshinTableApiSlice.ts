import { GridSelectionModel } from '@mui/x-data-grid-pro';

import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';
import { IDataItemArshin, IFormFilterArshin } from 'types/arshinIntegration';

export const arshinTableApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getData: builder.query<IDataItemArshin[], void>({
			query: () => API.arshin.getData,
			providesTags: ['ArshinData'],
		}),
		addItems: builder.mutation<void, GridSelectionModel>({
			query: ids => ({
				url: API.arshin.addItems,
				method: 'POST',
				body: ids,
			}),
			invalidatesTags: ['ArshinData'],
		}),
		deleteItems: builder.mutation<void, GridSelectionModel>({
			query: ids => ({
				url: API.arshin.deleteItems,
				method: 'DELETE',
				body: ids,
			}),
			invalidatesTags: ['ArshinData'],
		}),
		synchronizeItems: builder.mutation<void, GridSelectionModel>({
			query: ids => ({
				url: API.arshin.synchronizeItems,
				method: 'PATCH',
				body: {
					dataIds: ids,
				},
			}),
			invalidatesTags: ['ArshinData'],
		}),
		checkItems: builder.mutation<IDataItemArshin[], void>({
			query: () => ({
				url: API.arshin.checkItems,
				method: 'POST',
			}),
		}),
		getFilters: builder.query<IFormFilterArshin, void>({
			query: () => API.arshin.getFilters,
			providesTags: ['ArshinFilters'],
		}),
		editFilters: builder.mutation<void, IFormFilterArshin>({
			query: body => ({
				url: API.arshin.editFilters,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['ArshinFilters'],
		}),
		resetFilters: builder.mutation<void, void>({
			query: () => ({
				url: API.arshin.resetFilters,
				method: 'PUT',
			}),
			invalidatesTags: ['ArshinFilters'],
		}),
	}),
});

export const {
	useGetDataQuery,
	useGetFiltersQuery,
	useEditFiltersMutation,
	useResetFiltersMutation,
	useAddItemsMutation,
	useDeleteItemsMutation,
	useSynchronizeItemsMutation,
	useCheckItemsMutation,
} = arshinTableApiSlice;
