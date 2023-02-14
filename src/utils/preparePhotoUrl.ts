import { BASE_URL } from 'constant/baseUrl';

export const preparePhotoUrl = (src: string | undefined) => {
	if (typeof src === 'undefined') return '';

	if (!src.length) {
		return src;
	}

	return `${BASE_URL}/api/static/${src}`;
};
