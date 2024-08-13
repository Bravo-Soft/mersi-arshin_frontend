import { Box } from '@mui/material';

import { ErrorOverlay } from 'features/dataTable/components/ErrorOverlay';
import { useFileValidation } from 'hooks/useFileValidation';

interface IPDFViewer {
	url: string;
}

export const PdfViewer = ({ url }: IPDFViewer) => {
	const { fileStatus } = useFileValidation(url);

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
