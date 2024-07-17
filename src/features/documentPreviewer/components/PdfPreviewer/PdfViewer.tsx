import { Box, CircularProgress } from '@mui/material';
import * as pdfjsLib from 'pdfjs-dist';
import { useEffect, useState } from 'react';

import { ErrorOverlay } from 'features/dataTable/components/ErrorOverlay';
import { useUploadFile } from 'hooks/useFileUpload';

interface IPDFViewer {
	url: string;
}

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.mjs',
	import.meta.url
).toString();

export const PdfViewer = ({ url }: IPDFViewer) => {
	const [fileStatus, setFileStatus] = useState<{
		isEmpty: boolean | null;
		isCorrupt: boolean | null;
	}>({ isEmpty: null, isCorrupt: null });

	const { blob } = useUploadFile(url);

	useEffect(() => {
		const validatePDF = async (): Promise<{ isEmpty: boolean; isCorrupt: boolean }> => {
			try {
				// const response = await fetch(url);
				// const blob = await response.blob();

				if (blob?.size === 0) {
					return { isEmpty: true, isCorrupt: false };
				}

				const arrayBuffer = await blob?.arrayBuffer();
				const loadingData = pdfjsLib.getDocument({ data: arrayBuffer });
				const pdf = await loadingData.promise;

				if (pdf && pdf.numPages === 0) {
					return { isEmpty: true, isCorrupt: false };
				}
				return { isEmpty: false, isCorrupt: false };
			} catch (error) {
				return { isEmpty: false, isCorrupt: true };
			}
		};

		validatePDF().then(status => {
			setFileStatus(status);
		});
	}, [blob]);

	return (
		<Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
			{fileStatus.isEmpty && !fileStatus.isCorrupt && <ErrorOverlay errorType='emptyFile' />}
			{fileStatus.isCorrupt && <ErrorOverlay errorType='readError' />}
			{!fileStatus.isEmpty && !fileStatus.isCorrupt && (
				<iframe
					style={{ height: '100%', width: '100%', borderRadius: '0 0 8px 8px' }}
					src={url}
				></iframe>
			)}
		</Box>
	);
};
