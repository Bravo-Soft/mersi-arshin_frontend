import { BASE_URL } from 'constant/baseUrl';

export const preparePhotoUrl = (src: string | undefined) => {
	const mode = process.env.NODE_ENV;

	if (mode === 'development') {
		if (typeof src === 'undefined') return '';

		if (!src.length) {
			return src;
		}

		return `${BASE_URL}/api/static/${src}`;
	} else if (mode === 'production') {
		if (typeof src === 'undefined') return '';

		if (!src.length) {
			return src;
		}

		return `/api/static/${src}`;
	}
};
