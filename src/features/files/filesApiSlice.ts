import type { GridRowId } from '@mui/x-data-grid-pro';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';

import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';
import { dayjsFormatVariant } from 'constant/dateFormat';
import { HttpCodes } from 'constant/httpCodes';
import { Messages } from 'constant/messages';
import type { IDataItem } from 'types/dataItem';
import type { Rename } from 'types/rename';
import { saveAs } from 'utils/saveAs';

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
					showErrorMessage(result.error);
					return { error: result.error };
				}

				enqueueSnackbar(Messages.FILES_SUCCESSFULLY_UPLOADED, { variant: 'success' });

				return { data: null };
			},
			invalidatesTags: (_result, _error, { itemId }) => [{ type: 'Data', id: itemId }],
		}),

		deleteFile: builder.mutation<null, IDeleteFileArg>({
			queryFn: async ({ documentId, itemId }, _api, _, baseQuery) => {
				const result = await baseQuery({
					url: `${API.data.documents.byDocumentId(itemId, documentId)}`,
					method: 'DELETE',
				});

				if (result.error) {
					showErrorMessage(result.error);
					return { error: result.error };
				}

				return { data: null };
			},
			invalidatesTags: (_result, _error, { itemId }) => [{ type: 'Data', id: itemId }],
		}),

		downloadFile: builder.query<null, IDownloadFileArg>({
			queryFn: async ({ itemId, documentId, name }, _api, _, baseQuery) => {
				const result = await baseQuery({
					url: API.data.documents.byDocumentId(itemId, documentId),
					cache: 'no-cache',
					responseHandler: response =>
						response.status === HttpCodes.OK ? response.blob() : response.json(),
				});

				if (result.error) {
					showErrorMessage(result.error);
					return { error: result.error };
				}

				if (result.data instanceof Blob) saveAs(result.data, name);

				return { data: null };
			},
		}),

		downloadArchive: builder.query<null, GridRowId>({
			queryFn: async (id, _api, _, baseQuery) => {
				const result = await baseQuery({
					url: API.data.documents.documentsByItemId(id),
					cache: 'no-cache',
					responseHandler: response =>
						response.status === HttpCodes.OK ? response.blob() : response.json(),
				});

				if (result.error) {
					showErrorMessage(result.error);
					return { error: result.error };
				}

				if (result.data instanceof Blob)
					saveAs(result.data, `Архив от ${dayjs().format(dayjsFormatVariant)}.zip`);
				return { data: null };
			},
		}),
	}),
});

const showErrorMessage = (error: FetchBaseQueryError) => {
	switch (error.status) {
		case HttpCodes.BAD_REQUEST:
			enqueueSnackbar(Messages.PERMISSIONS_ERROR, { variant: 'error' });
			break;

		case HttpCodes.NOT_FOUND:
			enqueueSnackbar(Messages.FILE_NOT_FOUND, { variant: 'error' });
			break;

		case HttpCodes.FORBIDDEN:
			enqueueSnackbar(Messages.FORBIDDEN, { variant: 'error' });
			break;

		case HttpCodes.TO_LARGE:
			enqueueSnackbar(Messages.FILES_IS_LARGE, { variant: 'error' });
			break;

		default:
			enqueueSnackbar(Messages.SOMETHING_WRONG_ELSE, { variant: 'error' });
			break;
	}
};

export const {
	useLazyDownloadFileQuery,
	useLazyDownloadArchiveQuery,
	useDeleteFileMutation,
	useUploadFileMutation,
} = filesApiSlice;
