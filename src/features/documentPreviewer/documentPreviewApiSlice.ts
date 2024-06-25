import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';

const documentPreviewApiSlice = apiSlice.injectEndpoints({
	overrideExisting: false,
	endpoints: builder => ({
		getUrlForDocumentPreview: builder.query({
			query: ({ itemId, documentId }) => ({
				url: API.data.documents.getPreviewForDocument(itemId, documentId),
				responseHandler: response => response.text(),
			}),
		}),
	}),
});

export const { useGetUrlForDocumentPreviewQuery } = documentPreviewApiSlice;