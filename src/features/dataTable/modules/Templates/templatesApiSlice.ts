import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';

import type { ITemplateСonfig } from 'types/template';

export const templatesApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getAllTemplates: builder.query<Omit<ITemplateСonfig, 'template'>[], void>({
			query: () => API.user.templates.default,
			providesTags: result =>
				result
					? [
							...result.map(({ id }) => ({ type: 'Template' as const, id })),
							{ type: 'Template', id: 'LIST' },
							{ type: 'Template', id: 'DELETE_TEMPLATE' },
					  ]
					: [
							{ type: 'Template', id: 'LIST' },
							{ type: 'Template', id: 'DELETE_TEMPLATE' },
					  ],
		}),

		getTemplateById: builder.query<ITemplateСonfig, number>({
			query: id => `${API.user.templates.default}/${id}`,
			providesTags: (result, error, id) => [{ type: 'Template', id }],
		}),

		getSelectedTemplate: builder.query<ITemplateСonfig, void>({
			query: () => API.user.templates.selected,
			providesTags: [{ type: 'Template', id: 'SELECTED_TEMPLATE' }],
			// transformResponse: (response: ITemplateСonfig) => JSON.parse(response.template) as GridInitialStatePro,
		}),

		updateTemplate: builder.mutation<ITemplateСonfig, ITemplateСonfig>({
			query: ({ id, ...body }) => ({
				url: `${API.user.templates.default}/${id}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: (result, error, { id }) => [
				{ type: 'Template', id: 'LIST' },
				{ type: 'Template', id: 'SELECTED_TEMPLATE' },
			],
		}),

		createTemplate: builder.mutation<ITemplateСonfig, Omit<ITemplateСonfig, 'id'>>({
			query: body => ({
				url: API.user.templates.default,
				method: 'POST',
				body,
			}),
			invalidatesTags: [
				{ type: 'Template', id: 'LIST' },
				{ type: 'Template', id: 'SELECTED_TEMPLATE' },
			],
		}),

		deleteTemplate: builder.mutation<void, number>({
			query: id => ({
				url: `${API.user.templates.default}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [
				{ type: 'Template', id: 'DELETE_TEMPLATE' },
				{ type: 'Template', id: 'SELECTED_TEMPLATE' },
			],
		}),
	}),
});

export const {
	useCreateTemplateMutation,
	useDeleteTemplateMutation,
	useGetAllTemplatesQuery,
	useLazyGetSelectedTemplateQuery,
	useGetTemplateByIdQuery,
	useLazyGetAllTemplatesQuery,
	useLazyGetTemplateByIdQuery,
	useUpdateTemplateMutation,
	useGetSelectedTemplateQuery,
	usePrefetch,
} = templatesApiSlice;
