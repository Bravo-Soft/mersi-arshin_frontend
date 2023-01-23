import type { GridSelectionModel } from '@mui/x-data-grid-pro';
import type { ITag } from 'types/tag';

import { apiSlice } from 'app/apiSlice';
import { API } from 'app/api';

type Params = Record<string, boolean>;

type AllTagsRequestArgs = {
	selectedIds: GridSelectionModel;
	params: Params;
};

const printApiSlice = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: builder => ({
		getSelectedTags: builder.query<ITag[], AllTagsRequestArgs>({
			queryFn: async ({ selectedIds, params }, api, _extraOptions, baseQuery) => {
				const result = await baseQuery({
					url: API.data.print,
					method: 'POST',
					body: selectedIds,
					params,
				});

				if (Array.isArray(result.data) && result.data.length === 0)
					return { error: { status: 'CUSTOM_ERROR', error: 'List of tags is empty' } };

				if (result.error) return { error: result.error };

				return { data: result.data as ITag[] };
			},
		}),
	}),
});

export const { useGetSelectedTagsQuery, usePrefetch } = printApiSlice;
