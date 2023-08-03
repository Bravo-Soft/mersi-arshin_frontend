import { BUCKET_URL } from 'constant/bucket';

export const preparePhotoUrl = (src: string | undefined) => {
	if (src) {
		return `${BUCKET_URL}/${src}`;
	}

	return '';
};
