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
		getData: `/user/modules/arshin`,
		getFilters: `/user/settings/arshin`,
		editFilters: `/user/settings/arshin`,
		resetFilters: `/user/settings/arshin/reset`,
		addItems: `/user/modules/arshin`,
		deleteItems: `/user/modules/arshin`,
		synchronizeItems: `/user/modules/arshin/process/synchronize`,
		startArshin: `/user/modules/arshin/process/start`,
		cancelArshin: `/user/modules/arshin/process/cancel`,
		validateArshin: `/user/modules/arshin/validate`,
	},
	notification: {
		getNotifications: `/mersi/arshin-notification/arshin/unread`,
		readNotifications: (id: string) => `/mersi/arshin-notification/arshin/read/${id}`,
		readAllNotifications: `/mersi/arshin-notification/arshin/read`,
	},
};
