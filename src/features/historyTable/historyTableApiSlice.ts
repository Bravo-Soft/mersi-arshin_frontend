import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';
import { IHistoryItem } from 'types/historyItem';

export const historyTableApiSlice = apiSlice.injectEndpoints({
	overrideExisting: false,
	endpoints: builder => ({
		getAllHistoryData: builder.query<IHistoryItem[], void>({
			query: () => API.history.getAllHistoryData,
			providesTags: ['History'],
		}),

		getHistoryDataById: builder.query<IHistoryItem[], string>({
			query: historyItemId => API.history.getHistoryDataById(historyItemId),
			providesTags: ['History'],
		}),
	}),
});

export const {
	useGetAllHistoryDataQuery,
	useGetHistoryDataByIdQuery,
	useLazyGetAllHistoryDataQuery,
	useLazyGetHistoryDataByIdQuery,
	usePrefetch,
} = historyTableApiSlice;
