export const setCookie = (name: string, value?: string, days?: number) => {
	let expires = '';
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value ?? '') + expires + '; path=/';
};

export const getCookie = (name: string) => {
	const matches = document.cookie.match(
		// eslint-disable-next-line no-useless-escape
		new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
};
