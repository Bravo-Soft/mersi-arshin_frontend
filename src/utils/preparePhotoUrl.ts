import { getEnvValue } from './getEnvValue';

export const preparePhotoUrl = (src: string | undefined) => {
	if (typeof src === 'undefined') return '';

	if (!src.length) {
		return src;
	}

	const isProduction = process.env.NODE_ENV === 'production';

	if (isProduction) {
		return `/static${src}`;
	}

	return `${getEnvValue('BASE_URL')}/api/static/${src}`;
};
