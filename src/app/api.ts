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
			default: `/templates`,
			selected: `/templates/selected`,
			resetSelected: `/templates/selected/reset`,
			templateById: (templateId: string) => `/templates/${templateId}`,
			selectTemplateById: (templateId: string) => `/templates/${templateId}/select`,
		},
		profile: {
			default: `/user/profile`,
			photo: `/user/profile/photo`,
		},
		notification: `/settings/notification`,
		favoritesData: `/list-data/favorites`,
		printSettings: `/settings/print`,
		reviews: `/user/reviews`,
	},
	data: {
		default: `/data`,
		documents: {
			documentsByItemId: (id: GridRowId) => `/data/${id}/documents`,
			byDocumentId: (id: GridRowId, documentId: string | number) =>
				`/data/${id}/documents/${documentId}`,
			getDocumentsList: (id: GridRowId) => `data/${id}/documents/list`,
			getPreviewForDocument: (id: GridRowId, documentId: string) =>
				`/data/${id}/documents/${documentId}/url`, // add preview api
		},
		print: `/print/data`,
	},
	arshin: {
		getGroupData: `/arshin/data/group`,
		getUserData: `/arshin/data/user`,
		getFilters: `/arshin/group/settings`,
		editFilters: `/arshin/group/settings`,
		resetFilters: `/arshin/group/settings/reset`,
		addItems: `/arshin/data/add`,
		deleteItems: `/arshin/data/remove`,
		synchronizeItems: `/arshin/data/synchronize`,
		startArshin: `/arshin/process/add`,
		cancelArshin: `/arshin/process/cancel`,
		validateArshin: `/arshin/requests/validation`,
		getRequestsList: `arshin/requests`,
		createRequest: `arshin/requests`,
		getRequestItems: (requestId: string) => `/arshin/requests/${requestId}/data`,
		updateRequest: (requestId: string) => `arshin/requests/${requestId}`,
		startRequest: (requestId: string) => `arshin/requests/${requestId}/start`,
		stopRequest: (requestId: string) => `arshin/requests/${requestId}/stop`,
		deleteRequest: (requestId: string) => `arshin/requests/${requestId}`,
	},
	notification: {
		getNotifications: `/notifications/messages/unread`,
		readNotifications: (id: string) => `/notifications/messages/read/${id}`,
		readAllNotifications: `/notifications/messages/read`,
	},
	history: {
		getAllHistoryData: `/history`,
		getHistoryDataById: (id: GridRowId) => `/history/${id}`,
	},
};
