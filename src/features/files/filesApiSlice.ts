import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';
import { formatVariant } from 'constant/dateFormat';
import { HttpCodes } from 'constant/httpCodes';
import { Messages } from 'constant/messages';
import { format } from 'date-fns';
import { showNotification } from 'features/notificator/notificatorSlice';
import { saveAs } from 'utils/saveAs';

import type { GridRowId } from '@mui/x-data-grid-pro';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { AppDispatch } from 'app/store';
import type { IDataItem } from 'types/dataItem';
import type { Rename } from 'types/rename';

interface IDownloadFileArg extends Rename<Pick<IDataItem, 'id'>, 'id', 'itemId'> {
	documentId: string;
	name: string;
}

interface IUploadFileArg extends Pick<IDownloadFileArg, 'itemId'> {
	data: FormData;
}

interface IDeleteFileArg extends Pick<IDownloadFileArg, 'itemId'> {
	documentId: string;
}

const filesApiSlice = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: builder => ({
		uploadFile: builder.mutation<null, IUploadFileArg>({
			queryFn: async ({ itemId, data }, api, _, baseQuery) => {
				const result = await baseQuery({
					url: `${API.data.documents.documentsByItemId(itemId)}`,
					method: 'POST',
					body: data,
					validateStatus: response => response.status === HttpCodes.CREATED,
				});

				if (result.error) {
					showErrorMessage(result.error, api.dispatch);
					return { error: result.error };
				}

				api.dispatch(
					showNotification({
						message: Messages.FILES_SUCCESSFULLY_UPLOADED,
						type: 'success',
					})
				);

				return { data: null };
			},
			invalidatesTags: (_result, _error, { itemId }) => [{ type: 'Data', id: itemId }],
		}),

		deleteFile: builder.mutation<null, IDeleteFileArg>({
			queryFn: async ({ documentId, itemId }, api, _, baseQuery) => {
				const result = await baseQuery({
					url: `${API.data.documents.byDocumentId(itemId, documentId)}`,
					method: 'DELETE',
				});

				if (result.error) {
					showErrorMessage(result.error, api.dispatch);
					return { error: result.error };
				}

				return { data: null };
			},
			invalidatesTags: (_result, _error, { itemId }) => [{ type: 'Data', id: itemId }],
		}),

		downloadFile: builder.query<null, IDownloadFileArg>({
			queryFn: async ({ itemId, documentId, name }, api, _, baseQuery) => {
				const result = await baseQuery({
					url: API.data.documents.byDocumentId(itemId, documentId),
					cache: 'no-cache',

					responseHandler: response =>
						response.status === HttpCodes.OK ? response.blob() : response.json(),
				});

				if (result.error) {
					showErrorMessage(result.error, api.dispatch);
					return { error: result.error };
				}

				if (result.data instanceof Blob) saveAs(result.data, name);

				return { data: null };
			},
		}),

		downloadArchive: builder.query<null, GridRowId>({
			queryFn: async (id, api, _, baseQuery) => {
				const result = await baseQuery({
					url: API.data.documents.documentsByItemId(id),
					cache: 'no-cache',
					responseHandler: response =>
						response.status === HttpCodes.OK ? response.blob() : response.json(),
				});

				if (result.error) {
					showErrorMessage(result.error, api.dispatch);
					return { error: result.error };
				}

				if (result.data instanceof Blob)
					saveAs(result.data, `Архив от ${format(new Date(), formatVariant)}.zip`);

				return { data: null };
			},
		}),
	}),
});

const showErrorMessage = (error: FetchBaseQueryError, dispatch: AppDispatch) => {
	switch (error.status) {
		case HttpCodes.BAD_REQUEST:
			dispatch(
				showNotification({
					message: Messages.PERMISSIONS_ERROR,
					type: 'error',
				})
			);
			break;
		case HttpCodes.NOT_FOUND:
			dispatch(
				showNotification({
					message: Messages.FILE_NOT_FOUND,
					type: 'error',
				})
			);
			break;
		case HttpCodes.FORBIDDEN:
			dispatch(
				showNotification({
					message: Messages.FORBIDDEN,
					type: 'error',
				})
			);
			break;
		case HttpCodes.TO_LARGE:
			dispatch(
				showNotification({
					message: Messages.FILES_IS_LARGE,
					type: 'error',
				})
			);
			break;
		default:
			dispatch(
				showNotification({
					message: Messages.SOMETHING_WRONG_ELSE,
					type: 'error',
				})
			);
			break;
	}
};

export const {
	useLazyDownloadFileQuery,
	useLazyDownloadArchiveQuery,
	useDeleteFileMutation,
	useUploadFileMutation,
} = filesApiSlice;
