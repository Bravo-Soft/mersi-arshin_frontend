import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { IDataItem } from 'types/dataItem';

import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';
import { HttpCodes } from 'constant/httpCodes';
import { Messages } from 'constant/messages';
import { enqueueSnackbar } from 'notistack';

export interface IGetAllDataResponse {
	pagesCount: number;
	page: number;
	pageSize: number;
	totalCount: number;
	items: IDataItem[];
}

export const dataTableApiSlice = apiSlice.injectEndpoints({
	overrideExisting: false,
	endpoints: builder => ({
		getAllData: builder.query<IDataItem[], void>({
			query: () => API.data.default,
			transformResponse: (response: IGetAllDataResponse) => response.items,
			providesTags: result =>
				result
					? [
							...result.map(({ id }) => ({ type: 'Data' as const, id })),
							{ type: 'Data', id: 'LIST' },
							{ type: 'Data', id: 'DELETE_ITEM' },
					  ]
					: [
							{ type: 'Data', id: 'LIST' },
							{ type: 'Data', id: 'DELETE_ITEM' },
					  ],
		}),

		getDataById: builder.query<IDataItem, string | number | undefined>({
			query: id => `${API.data.default}/${id}`,
			providesTags: (_result, _error, id) => [{ type: 'Data', id }],
		}),

		createNewDataItem: builder.mutation<IDataItem, Omit<IDataItem, 'id' | 'userIds'>>({
			query: body => ({
				url: API.data.default,
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Data', id: 'LIST' }],
			onQueryStarted: async (_arg, { queryFulfilled }) => {
				try {
					await queryFulfilled;
					enqueueSnackbar(Messages.ITEM_SUCCESSFULLY_CREATED, { variant: 'success' });
				} catch {
					enqueueSnackbar(Messages.FAILED_TO_SAVE_ITEM, { variant: 'error' });
				}
			},
		}),

		updateDataItem: builder.mutation<void, Omit<IDataItem, 'userIds'>>({
			query: ({ id, documents, ...body }) => ({
				url: `${API.data.default}/${id}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: (_result, _error, { id }) => [{ type: 'Data', id }],
			onQueryStarted: async (_arg, { queryFulfilled }) => {
				try {
					await queryFulfilled;
					enqueueSnackbar(Messages.DATA_ITEM_IS_UPDATED, { variant: 'success' });
				} catch (error) {
					const fetchError = error as FetchBaseQueryError;
					switch (fetchError.status) {
						case 'FETCH_ERROR':
							enqueueSnackbar(Messages.ERROR_CONNECTION, { variant: 'error' });
							break;

						case HttpCodes.BAD_REQUEST:
							enqueueSnackbar(Messages.INVALID_REQUEST_BODY, { variant: 'error' });
							break;

						case HttpCodes.FORBIDDEN:
							enqueueSnackbar(Messages.PERMISSIONS_ERROR, { variant: 'error' });
							break;

						case HttpCodes.NOT_FOUND:
							enqueueSnackbar(Messages.ITEM_NOT_FOUND, { variant: 'error' });
							break;

						default:
							enqueueSnackbar(Messages.SOMETHING_WRONG_ELSE, { variant: 'error' });
							break;
					}
				}
			},
		}),

		deleteDataItem: builder.mutation<void, IDataItem['id']>({
			query: id => ({
				url: `${API.data.default}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Data', id: 'DELETE_ITEM' }],
			onQueryStarted: async (_arg, { queryFulfilled }) => {
				try {
					await queryFulfilled;
					enqueueSnackbar(Messages.ITEM_SUCCESSFULLY_DELETED, { variant: 'success' });
				} catch {
					enqueueSnackbar(Messages.FAILED_DELETE_ITEM, { variant: 'error' });
				}
			},
		}),
	}),
});

export const {
	useGetAllDataQuery,
	useCreateNewDataItemMutation,
	useDeleteDataItemMutation,
	useGetDataByIdQuery,
	useLazyGetAllDataQuery,
	useLazyGetDataByIdQuery,
	useUpdateDataItemMutation,
	usePrefetch,
} = dataTableApiSlice;
