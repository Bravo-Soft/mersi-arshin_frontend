import { Box } from '@mui/material';
import { renderAsync } from 'docx-preview';
import { RefObject, useEffect, useRef, useState } from 'react';

import { selectIsPreviewerFailed, setPreviewerIsFailed } from '../../documentPreviewerSlice';

import { isDocxEmpty } from './utils/isDocxEmpty';

import { ErrorOverlay } from 'features/dataTable/components/ErrorOverlay';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useUploadFile } from 'hooks/useFileUpload';

interface IDocxViewer {
	url: string;
}

export const DocxViewer = ({ url }: IDocxViewer) => {
	const docxContainerRef = useRef<HTMLDivElement>();
	const [emptyFile, setEmptyFile] = useState<boolean | null>(null);

	const dispatch = useAppDispatch();
	const previewerIsFailed = useAppSelector(selectIsPreviewerFailed);

	const { blob } = useUploadFile(url);

	useEffect(() => {
		const renderDocx = async () => {
			await renderAsync(blob, docxContainerRef.current as HTMLDivElement);
		};

		if (blob) {
			isDocxEmpty(blob, dispatch)
				.then(isEmpty => {
					if (isEmpty) {
						setEmptyFile(true);
					} else {
						renderDocx();
						setEmptyFile(false);
					}
				})
				.catch(() => {
					dispatch(setPreviewerIsFailed(true));
				});
		}
	}, [blob, dispatch]);

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
			{previewerIsFailed && <ErrorOverlay errorType='readError' />}
			{emptyFile && <ErrorOverlay errorType='emptyFile' />}
		</Box>
	);
};
