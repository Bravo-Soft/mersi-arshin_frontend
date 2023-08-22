import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';
import { IFormFilterArshin } from 'types/arshinIntegration';

export const arshinTableApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
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
	}),
});

export const { useGetFiltersQuery, useEditFiltersMutation, useResetFiltersMutation } =
	arshinTableApiSlice;
