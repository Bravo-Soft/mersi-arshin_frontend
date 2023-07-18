import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';
import type { ITemplateConfig } from 'types/template';

type TemplatesList = Omit<ITemplateConfig, 'template'>[];

export const templatesApiSlice = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: builder => ({
		fetchSelectedTemplate: builder.query<ITemplateConfig, void>({
			query: () => API.user.templates.selected,
			providesTags: [{ type: 'Template', id: 'SELECTED' }],
		}),
		resetSelectedTemplate: builder.mutation<ITemplateConfig, void>({
			query: () => ({
				url: API.user.templates.resetSelected,
				method: 'PUT',
			}),
			invalidatesTags: [{ type: 'Template', id: 'SELECTED' }],
		}),
		fetchTemplateById: builder.query<ITemplateConfig, ITemplateConfig['id']>({
			query: id => API.user.templates.templateById(id),
		}),
		deleteTemplateById: builder.mutation<ITemplateConfig, ITemplateConfig['id']>({
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
		createNewTemplate: builder.mutation<ITemplateConfig, Pick<ITemplateConfig, 'templateName'>>({
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
		updateSelectedTemplate: builder.mutation<ITemplateConfig, Pick<ITemplateConfig, 'template'>>({
			query: body => ({
				url: API.user.templates.default,
				method: 'PUT',
				body,
			}),
			invalidatesTags: [{ type: 'Template', id: 'SELECTED' }],
		}),
		selectTemplateById: builder.mutation<ITemplateConfig, ITemplateConfig['id']>({
			query: id => ({
				url: API.user.templates.selectTemplateById(id),
				method: 'PATCH',
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
