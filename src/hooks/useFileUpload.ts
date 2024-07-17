import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

import { useAppDispatch } from './redux';

import { Messages } from 'constant/messages';
import { setPreviewerIsFailed } from 'features/documentPreviewer/documentPreviewerSlice';

export const useUploadFile = (url: string) => {
	const [blob, setBlob] = useState<Blob | null>(null);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setPreviewerIsFailed(false));
		fetch(url)
			.then(res => res.blob())
			.then(blob => setBlob(blob))
			.catch(() => {
				enqueueSnackbar(Messages.ERROR_REPEAT, { variant: 'error' });
				dispatch(setPreviewerIsFailed(true));
			});
	}, [url, dispatch]);

	return { blob };
};
