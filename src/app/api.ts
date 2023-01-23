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
			selected: `${PREFIX}/user/selected`,
		},
		profile: `${PREFIX}/user/profile`,
		photo: `${PREFIX}/user/photo`,
		notifications: `${PREFIX}/user/notification`,
		favorites: `${PREFIX}/user/favorites/data`,
		printSettings: `${PREFIX}/user/print-settings`,
	},
	data: {
		default: `${PREFIX}/data`,
		print: `${PREFIX}/print/data`,
		documentsDataItem: (id: string | number) => `${PREFIX}/data/${id}/documents`,
		documentItem: (id: string | number, dId: string | number) =>
			`${PREFIX}/data/${id}/documents/${dId}`,
	},
	reviews: {
		default: `${PREFIX}/reviews`,
	},
};
