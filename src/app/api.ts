import type { GridRowId } from '@mui/x-data-grid-pro';

export const API = {
	auth: {
		login: `/auth/login`,
		refresh: `/auth/refresh-token`,
		logout: `/auth/logout`,
	},
	user: {
		default: `/user`,
		templates: {
			default: `/user/templates`,
			selected: `/user/templates/selected`,
			resetSelected: `/user/templates/selected/reset`,
			templateById: (templateId: string) => `/user/templates/${templateId}`,
			selectTemplateById: (templateId: string) => `/user/templates/${templateId}/select`,
		},
		profile: {
			default: `/user/profile`,
			photo: `/user/profile/photo`,
		},
		notification: `/user/notification`,
		favoritesData: `/user/favorites/data`,
		printSettings: `/user/print-settings`,
		reviews: `/user/reviews`,
	},
	data: {
		default: `/data`,
		documents: {
			documentsByItemId: (id: GridRowId) => `/data/${id}/documents`,
			byDocumentId: (id: GridRowId, documentId: string | number) =>
				`/data/${id}/documents/${documentId}`,
		},
		print: `/print/data`,
	},
};
