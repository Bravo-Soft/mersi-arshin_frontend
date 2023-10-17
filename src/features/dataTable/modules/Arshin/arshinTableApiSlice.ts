import { GridSelectionModel } from '@mui/x-data-grid-pro';

import { setNotValidArshinItem } from './arshinTableSlice';
import { changeDialogState } from './dialogArshinSlice';

import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';
import { IDataItemArshin, IFormFilterArshin } from 'types/arshinIntegration';
import { IDataItem } from 'types/dataItem';

export interface ApiErrorResponse {
	status: number;
	data: { message: string; statusCode: number; response: IDataItem[] };
}

export function isApiResponse(error: unknown): error is ApiErrorResponse {
	return (
		typeof error === 'object' &&
		error != null &&
		'status' in error &&
		typeof (error as any).status === 'number'
	);
}

export const arshinTableApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getData: builder.query<IDataItemArshin[], void>({
			query: () => API.arshin.getData,
			providesTags: ['ArshinData', 'ArshinStart'],
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
				method: 'POST',
				body: ids,
			}),
			invalidatesTags: ['ArshinData'],
		}),
		startArshin: builder.mutation<void, string[]>({
			query: body => ({
				url: API.arshin.startArshin,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['ArshinStart'],
		}),
		cancelArshin: builder.mutation<void, void>({
			query: () => ({
				url: API.arshin.cancelArshin,
				method: 'PATCH',
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
		validateArshin: builder.mutation<void, string[]>({
			query: body => ({
				url: API.arshin.validateArshin,
				method: 'POST',
				body,
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				queryFulfilled.catch(({ error }) => {
					if (isApiResponse(error) && error.status === 409) {
						dispatch(setNotValidArshinItem(error.data.response));
						dispatch(changeDialogState('validate'));
					}
				});
			},
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
	useStartArshinMutation,
	useCancelArshinMutation,
	useValidateArshinMutation,
} = arshinTableApiSlice;
