import { Box, TextField } from '@mui/material';

import { ErrorOverlay } from 'features/dataTable/components/ErrorOverlay';
import { useFileValidation } from 'hooks/useFileValidation';

interface ITxtViewer {
	url: string;
}

export const TxtViewer = ({ url }: ITxtViewer) => {
	const { text, fileStatus } = useFileValidation(url);

	return (
		<Box
			sx={{
				height: '100%',
				width: '100%',
				maxHeight: '80vh',
			}}
		>
			{fileStatus.isEmpty ? (
				<ErrorOverlay errorType='emptyFile' />
			) : fileStatus.isCorrupt ? (
				<ErrorOverlay errorType='readError' />
			) : (
				<TextField
					multiline
					hiddenLabel
					InputProps={{
						readOnly: true,
						disableUnderline: true,
					}}
					fullWidth
					minRows={10}
					maxRows={24}
					sx={{
						padding: '10px 25px 10px 5vw !important',
						overflowY: 'auto',
						background: '#fff',
						border: 'none',
					}}
					value={text}
					variant='standard'
				/>
			)}
		</Box>
	);
};
