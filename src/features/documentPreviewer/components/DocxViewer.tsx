import { Box } from '@mui/material';
import { renderAsync } from 'docx-preview';
import JSZip from 'jszip';
import { enqueueSnackbar } from 'notistack';
import { RefObject, useEffect, useRef, useState } from 'react';

import { Messages } from '../../../constant/messages';

import { ErrorOverlay } from 'features/dataTable/components/ErrorOverlay';

interface IDocxViewer {
	url: string;
}

export const DocxViewer = ({ url }: IDocxViewer) => {
	const [blob, setBlob] = useState<Blob | null>(null);
	const docxContainerRef = useRef<HTMLDivElement>();
	const [emptyFile, setEmptyFile] = useState<boolean | null>(null);

	useEffect(() => {
		fetch(url)
			.then(res => res.blob())
			.then(blob => setBlob(blob))
			.catch(() => enqueueSnackbar(Messages.ERROR_REPEAT, { variant: 'error' }));
	}, [url]);

	useEffect(() => {
		const isDocxEmpty = async (blob: Blob): Promise<boolean> => {
			try {
				const arrayBuffer = await blob.arrayBuffer();
				const zip = await JSZip.loadAsync(arrayBuffer);
				const docXml = await zip?.file('word/document.xml')?.async('text');
				const parser = new DOMParser();
				const xmlDoc = docXml && parser.parseFromString(docXml, 'application/xml');
				const textContent = (xmlDoc && xmlDoc?.documentElement?.textContent) || '';
				return textContent.trim().length === 0;
			} catch (error) {
				return true;
			}
		};

		const renderDocx = async () => {
			await renderAsync(blob, docxContainerRef?.current as HTMLDivElement);
		};

		if (blob) {
			isDocxEmpty(blob).then(isEmpty => {
				if (isEmpty) {
					setEmptyFile(true);
				} else {
					renderDocx();
					setEmptyFile(false);
				}
			});
		}
	}, [blob]);

	return typeof emptyFile === 'boolean' || emptyFile === null ? (
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
			{emptyFile && <ErrorOverlay errorType='emptyFile' />}
		</Box>
	) : (
		<></>
	);
};
