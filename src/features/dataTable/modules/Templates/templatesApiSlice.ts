import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';

import type { ITemplateСonfig } from 'types/template';

type TemplatesList = Omit<ITemplateСonfig, 'template'>[];

export const templatesApiSlice = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: builder => ({
		fetchSelectedTemplate: builder.query<ITemplateСonfig, void>({
			query: () => API.user.templates.selected,
			providesTags: [{ type: 'Template', id: 'SELECTED' }],
		}),
		resetSelectedTemplate: builder.mutation<ITemplateСonfig, void>({
			query: () => ({
				url: API.user.templates.resetSelected,
				method: 'PUT',
			}),
			invalidatesTags: [{ type: 'Template', id: 'SELECTED' }],
		}),
		fetchTemplateById: builder.query<ITemplateСonfig, ITemplateСonfig['id']>({
			query: id => API.user.templates.templateById(id),
		}),
		deleteTemplateById: builder.mutation<ITemplateСonfig, ITemplateСonfig['id']>({
			query: id => ({
				url: API.user.templates.templateById(id),
				method: 'DELETE',
			}),
			invalidatesTags: [
				{ type: 'Template', id: 'LIST' },
				{ type: 'Template', id: 'SELECTED' },
			],
		}),
		fetchAllTemplates: builder.query<TemplatesList, void>({
			query: () => API.user.templates.default,
			providesTags: [{ type: 'Template', id: 'LIST' }],
		}),
		createNewTemplate: builder.mutation<ITemplateСonfig, Pick<ITemplateСonfig, 'templateName'>>({
			query: body => ({
				url: API.user.templates.default,
				method: 'POST',
				body,
			}),
			invalidatesTags: [
				{ type: 'Template', id: 'LIST' },
				{ type: 'Template', id: 'SELECTED' },
			],
		}),
		updateSelectedTemplate: builder.mutation<ITemplateСonfig, Pick<ITemplateСonfig, 'template'>>({
			query: body => ({
				url: API.user.templates.default,
				method: 'PUT',
				body,
			}),
			invalidatesTags: [{ type: 'Template', id: 'SELECTED' }],
		}),
		selectTemplateById: builder.mutation<ITemplateСonfig, ITemplateСonfig['id']>({
			query: id => ({
				url: API.user.templates.selectTemplateById(id),
				method: 'PUT',
			}),
			invalidatesTags: [
				{ type: 'Template', id: 'LIST' },
				{ type: 'Template', id: 'SELECTED' },
			],
		}),
	}),
});

export const {
	useFetchSelectedTemplateQuery,
	useResetSelectedTemplateMutation,
	useSelectTemplateByIdMutation,
	useDeleteTemplateByIdMutation,
	useFetchAllTemplatesQuery,
	useCreateNewTemplateMutation,
	useUpdateSelectedTemplateMutation,
} = templatesApiSlice;
