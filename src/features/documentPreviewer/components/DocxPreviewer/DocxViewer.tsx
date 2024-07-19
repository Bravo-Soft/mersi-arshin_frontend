import { Box } from '@mui/material';
import { renderAsync } from 'docx-preview';
import { RefObject, useEffect, useRef } from 'react';

import { ErrorOverlay } from 'features/dataTable/components/ErrorOverlay';
import { useFileValidation } from 'hooks/useFileValidation';

interface IDocxViewer {
	url: string;
}

export const DocxViewer = ({ url }: IDocxViewer) => {
	const docxContainerRef = useRef<HTMLDivElement>();
	const { fileStatus, blob } = useFileValidation(url);

	useEffect(() => {
		const renderDocx = async () => {
			if (blob) {
				await renderAsync(blob, docxContainerRef.current as HTMLDivElement);
			}
		};

		if (!fileStatus.isEmpty && !fileStatus.isCorrupt) {
			renderDocx();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fileStatus]);

	return (
		<Box
			ref={docxContainerRef as RefObject<HTMLDivElement>}
			sx={{
				height: '100%',
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
		>
			{fileStatus.isEmpty && <ErrorOverlay errorType='emptyFile' />}
			{fileStatus.isCorrupt && <ErrorOverlay errorType='readError' />}
		</Box>
	);
};
