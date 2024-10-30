import { HISTORY_MOCK } from './HISTORY_MOCK';

import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';
import { IHistoryItem } from 'types/historyItem';

export const historyTableApiSlice = apiSlice.injectEndpoints({
	overrideExisting: false,
	endpoints: builder => ({
		getAllHistoryData: builder.query<IHistoryItem[], number | string | void>({
			queryFn: async factoryNumber => {
				await new Promise(resolve => setTimeout(resolve, 500));
				if (factoryNumber) {
					const filteredData = HISTORY_MOCK.filter(
						item => item.factoryNumber === factoryNumber
					);

					return { data: filteredData.length ? filteredData : [] };
				}
				return { data: HISTORY_MOCK };
			},
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

		getHistoryDataByFactoryNumber: builder.query<IHistoryItem[], string | number>({
			queryFn: async factoryNumber => {
				await new Promise(resolve => setTimeout(resolve, 500));

				const filteredData = HISTORY_MOCK.filter(item => item.factoryNumber === factoryNumber);

				return { data: filteredData.length ? filteredData : [] };
			},
			providesTags: (_result, _error, id) => [{ type: 'Data', id }],
		}),
	}),
});

export const {
	useGetAllHistoryDataQuery,
	useGetHistoryDataByFactoryNumberQuery,
	useLazyGetAllHistoryDataQuery,
	useLazyGetHistoryDataByFactoryNumberQuery,
	usePrefetch,
} = historyTableApiSlice;
