import { GridSelectionModel } from '@mui/x-data-grid-pro';
import { enqueueSnackbar } from 'notistack';

import { setNotValidArshinItem, setPendingRequest } from './arshinTableSlice';
import { changeDialogState } from './dialogArshinSlice';

import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';
import { Messages } from 'constant/messages';
import { IDataItemArshin, IRequestItem, IResponseValidateArshin } from 'types/arshinIntegration';

interface ApiError {
	error: {
		status: number;
		data: {
			message: string;
		};
	};
}

export const arshinTableApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getGroupData: builder.query<IDataItemArshin[], void>({
			query: () => API.arshin.getGroupData,
			providesTags: ['ArshinData', 'ArshinStart'],
		}),
		getUserArshinData: builder.query<IDataItemArshin[], void>({
			query: () => API.arshin.getUserData,
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
				method: 'PUT',
				body: ids,
			}),
			invalidatesTags: ['ArshinData', 'RequestsList'],
		}),
		validateArshin: builder.mutation<
			IResponseValidateArshin[],
			Omit<IRequestItem, 'id' | 'status' | 'creator'>
		>({
			queryFn: async (body, { dispatch }, _extraOptions, baseQuery) => {
				const response = await baseQuery({
					url: API.arshin.validateArshin,
					method: 'POST',
					body: body.dataIds,
				});

				if (Array.isArray(response.data) && response.data.length) {
					dispatch(setNotValidArshinItem(response.data));
					dispatch(setPendingRequest(body));
					dispatch(changeDialogState('validate'));
					return { error: { status: 'CUSTOM_ERROR', error: 'List of tags is empty' } };
				}
				return {
					data: response.data as IResponseValidateArshin[],
				};
			},
		}),
		getRequestsList: builder.query<IRequestItem[], void>({
			query: () => API.arshin.getRequestsList,
			providesTags: ['RequestsList'],
		}),
		createNewRequest: builder.mutation<
			IRequestItem[],
			Omit<IRequestItem, 'id' | 'status' | 'creator'>
		>({
			query: body => ({
				url: API.arshin.createRequest,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['RequestsList', 'ArshinData'],
			onQueryStarted: async (_arg, { queryFulfilled }) => {
				try {
					await queryFulfilled;
					enqueueSnackbar(Messages.REQUEST_SUCCESSFULLY_SENDED, { variant: 'success' });
				} catch (error: unknown) {
					if ((error as ApiError).error?.status === 400) {
						enqueueSnackbar((error as ApiError).error.data.message, { variant: 'error' });
					} else {
						enqueueSnackbar(Messages.FAILED_SEND_REQUEST, { variant: 'error' });
					}
				}
			},
		}),
		updateRequest: builder.mutation<void, Omit<IRequestItem, 'creator' | 'dataIds' | 'status'>>({
			query: ({ id, ...body }) => ({
				url: API.arshin.updateRequest(id),
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['RequestsList', 'ArshinData'],
			onQueryStarted: async (_arg, { queryFulfilled }) => {
				try {
					await queryFulfilled;
					enqueueSnackbar(Messages.REQUEST_SUCCESSFULLY_EDIT, { variant: 'success' });
				} catch {
					enqueueSnackbar(Messages.FAILED_EDIT_REQUEST, { variant: 'error' });
				}
			},
		}),
		startRequest: builder.mutation<void, string>({
			query: requestId => ({
				url: API.arshin.startRequest(requestId),
				method: 'PATCH',
			}),
			invalidatesTags: ['RequestsList', 'ArshinData'],
		}),
		stopRequest: builder.mutation<void, string>({
			query: requestId => ({
				url: API.arshin.stopRequest(requestId),
				method: 'PATCH',
			}),
			invalidatesTags: ['RequestsList', 'ArshinData'],
		}),
		deleteRequest: builder.mutation<void, string>({
			query: requestId => ({
				url: API.arshin.deleteRequest(requestId),
				method: 'DELETE',
			}),
			invalidatesTags: ['RequestsList', 'ArshinData'],
		}),
		getRequestData: builder.query<IDataItemArshin[], string>({
			query: requestId => API.arshin.getRequestItems(requestId),
			providesTags: ['ArshinData'],
		}),
	}),
});

export const {
	useGetGroupDataQuery,
	useGetUserArshinDataQuery,
	useAddItemsMutation,
	useDeleteItemsMutation,
	useSynchronizeItemsMutation,
	useValidateArshinMutation,
	useGetRequestsListQuery,
	useCreateNewRequestMutation,
	useUpdateRequestMutation,
	useStartRequestMutation,
	useStopRequestMutation,
	useDeleteRequestMutation,
	useGetRequestDataQuery,
} = arshinTableApiSlice;
