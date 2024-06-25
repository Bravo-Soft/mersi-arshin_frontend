import { Box } from '@mui/material';
import { renderAsync } from 'docx-preview';
import { enqueueSnackbar } from 'notistack';
import { RefObject, useEffect, useRef, useState } from 'react';

import { Messages } from '../../../constant/messages';

interface IDocxViewer {
	url: string;
}

export const DocxViewer = ({ url }: IDocxViewer) => {
	const [blob, setBlob] = useState<Blob | null>(null);
	const docxContainerRef = useRef<HTMLDivElement>();

	useEffect(() => {
		fetch(url)
			.then(res => res.blob())
			.then(blob => setBlob(blob))
			.catch(() => enqueueSnackbar(Messages.ERROR_REPEAT, { variant: 'error' }));
	}, [url]);

	useEffect(() => {
		const renderDocx = async () => {
			await renderAsync(blob, docxContainerRef?.current as HTMLDivElement);
		};

		if (blob) {
			renderDocx();
		}
	}, [blob]);

	return (
		<Box
			ref={docxContainerRef as RefObject<HTMLDivElement>}
			sx={{
				width: '100%',
				'& .docx-wrapper': {
					borderRadius: '0 0 8px 8px',
					maxHeight: '80vh',
				},
				'& .docx-wrapper .docx': {
					minHeight: 'unset !important',
					padding: '16px !important',
					overflowY: 'auto',
				},
			}}
		></Box>
	);
};
