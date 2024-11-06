import { GridSelectionModel } from '@mui/x-data-grid-pro';
import { enqueueSnackbar } from 'notistack';

import { setNotValidArshinItem, setRequestsList } from './arshinTableSlice';
import { changeDialogState } from './dialogArshinSlice';
import { REQUESTS_MOCK } from './REQUESTS_MOCK';

import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';
import {
	IDataItemArshin,
	IFormFilterArshin,
	IRequestItem,
	IResponseValidateArshin,
} from 'types/arshinIntegration';

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
			invalidatesTags: ['ArshinData', 'Data'],
		}),
		deleteItems: builder.mutation<void, GridSelectionModel>({
			query: ids => ({
				url: API.arshin.deleteItems,
				method: 'DELETE',
				body: ids,
			}),

			invalidatesTags: ['ArshinData', 'Data'],
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
			onQueryStarted: async (_, { queryFulfilled }) => {
				try {
					await queryFulfilled;
					enqueueSnackbar('Данные отправленные на проверку', { variant: 'success' });
				} catch {
					enqueueSnackbar('Не удалось отправить данные на проверку', { variant: 'error' });
				}
			},
		}),
		cancelArshin: builder.mutation<void, void>({
			query: () => ({
				url: API.arshin.cancelArshin,
				body: [],
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
		validateArshin: builder.mutation<IResponseValidateArshin[], string[]>({
			queryFn: async (body, { dispatch }, _extraOptions, baseQuery) => {
				const response = await baseQuery({
					url: API.arshin.validateArshin,
					method: 'POST',
					body,
				});

				if (Array.isArray(response.data) && response.data.length) {
					dispatch(setNotValidArshinItem(response.data));
					dispatch(changeDialogState('validate'));
					return { error: { status: 'CUSTOM_ERROR', error: 'List of tags is empty' } };
				}
				return {
					data: response.data as IResponseValidateArshin[],
				};
			},
		}),
		getRequestsList: builder.query<IRequestItem[], void>({
			queryFn: async (_, { dispatch }) => {
				await new Promise(resolve => setTimeout(resolve, 500));
				dispatch(setRequestsList(REQUESTS_MOCK));
				return { data: REQUESTS_MOCK };
			},
			providesTags: ['RequestsList'],
		}),
		createNewRequest: builder.mutation<IRequestItem[], IRequestItem>({
			queryFn: async (data, { dispatch }) => {
				await new Promise(resolve => setTimeout(resolve, 500));
				const updatedData = [...REQUESTS_MOCK, data];
				dispatch(setRequestsList(updatedData));
				return { data: updatedData };
			},
			// invalidatesTags: ['RequestsList'],
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
	useGetRequestsListQuery,
	useCreateNewRequestMutation,
} = arshinTableApiSlice;
