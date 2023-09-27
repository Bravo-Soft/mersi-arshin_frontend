import type { GridRowId } from '@mui/x-data-grid-pro';

const PREFIX = '/api';

export const API = {
	auth: {
		login: `${PREFIX}/auth/login`,
		refresh: `${PREFIX}/auth/refresh-token`,
		logout: `${PREFIX}/auth/logout`,
	},
	user: {
		default: `${PREFIX}/user`,
		templates: {
			default: `${PREFIX}/user/templates`,
			selected: `${PREFIX}/user/templates/selected`,
			resetSelected: `${PREFIX}/user/templates/selected/reset`,
			templateById: (templateId: string) => `${PREFIX}/user/templates/${templateId}`,
			selectTemplateById: (templateId: string) =>
				`${PREFIX}/user/templates/${templateId}/select`,
		},
		profile: {
			default: `${PREFIX}/user/profile`,
			photo: `${PREFIX}/user/profile/photo`,
		},
		notification: `${PREFIX}/user/notification`,
		favoritesData: `${PREFIX}/user/favorites/data`,
		printSettings: `${PREFIX}/user/print-settings`,
		reviews: `${PREFIX}/user/reviews`,
	},
	data: {
		default: `${PREFIX}/data`,
		documents: {
			documentsByItemId: (id: GridRowId) => `${PREFIX}/data/${id}/documents`,
			byDocumentId: (id: GridRowId, documentId: string | number) =>
				`${PREFIX}/data/${id}/documents/${documentId}`,
		},
		print: `${PREFIX}/print/data`,
	},
	arshin: {
		getData: `${PREFIX}/user/modules/arshin`,
		getFilters: `${PREFIX}/user/fgis/settings`,
		editFilters: `${PREFIX}/user/fgis/settings`,
		resetFilters: `${PREFIX}/user/fgis/settings/reset`,
		addItems: `${PREFIX}/user/modules/arshin`,
		deleteItems: `${PREFIX}/user/modules/arshin`,
		synchronizeItems: `${PREFIX}/user/fgis/synchronize`,
		checkItems: `${PREFIX}/user/fgis/check`,
	},
};
