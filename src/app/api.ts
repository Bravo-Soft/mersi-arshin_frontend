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
			default: `/account/profile`,
			photo: `/account/profile/photo`,
		},
		notification: `/user/settings/notification`,
		favoritesData: `/user/list-data/favorites`,
		printSettings: `/user/settings/print`,
		reviews: `/user/reviews`,
	},
	data: {
		default: `/data`,
		documents: {
			documentsByItemId: (id: GridRowId) => `/data/${id}/documents`,
			byDocumentId: (id: GridRowId, documentId: string | number) =>
				`/data/${id}/documents/${documentId}`,
			getDocumentsList: (id: GridRowId) => `data/${id}/documents/list`,
		},
		print: `/print/data`,
	},
	arshin: {
		getData: `/arshin/data`,
		getFilters: `/arshin/group/settings`,
		editFilters: `/arshin/group/settings`,
		resetFilters: `/arshin/group/settings`,
		addItems: `/data/arshin/add`,
		deleteItems: `/arshin/data`,
		synchronizeItems: `/arshin/data/synchronization`,
		startArshin: `/arshin/process/add`,
		cancelArshin: `/arshin/process/cancel`,
		validateArshin: `/arshin/data/validation`,
	},
	notification: {
		getNotifications: `/notifications/messages/unread`,
		readNotifications: (id: string) => `/notifications/messages/read/${id}`,
		readAllNotifications: `/notifications/messages/read`,
	},
};
