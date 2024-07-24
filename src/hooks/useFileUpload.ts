import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

import { Messages } from 'constant/messages';

export const useUploadFile = (url: string) => {
	const [blob, setBlob] = useState<Blob | null>(null);
	const [arrayBuffer, setArrayBuffer] = useState<ArrayBuffer | null>(null);

	useEffect(() => {
		const getFileByUrl = async () => {
			try {
				const response = await fetch(url);

				const blob = await response.blob();
				setBlob(blob);

				const arrayBuffer = await blob.arrayBuffer();
				setArrayBuffer(arrayBuffer);
			} catch (error) {
				enqueueSnackbar(Messages.ERROR_REPEAT, { variant: 'error' });
			}
		};

		getFileByUrl();
	}, [url]);

	return { blob, arrayBuffer };
};
