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
		getData: `/group/arshin/data`,
		getFilters: `/group/settings/arshin`,
		editFilters: `/group/settings/arshin`,
		resetFilters: `/group/settings/arshin/reset`,
		addItems: `/group/arshin/data`,
		deleteItems: `/group/arshin/data`,
		synchronizeItems: `/group/modules/arshin/process/synchronize`,
		startArshin: `/group/arshin/process/add`,
		cancelArshin: `/group/arshin/process/cancel`,
		validateArshin: `/group/arshin/validate`,
	},
	notification: {
		getNotifications: `/mersi/arshin-notification/arshin/unread`,
		readNotifications: (id: string) => `/mersi/arshin-notification/arshin/read/${id}`,
		readAllNotifications: `/mersi/arshin-notification/arshin/read`,
	},
};
