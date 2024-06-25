import { Box, TextField } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

import { Messages } from '../../../constant/messages';

interface ITxtViewer {
	url: string;
}

export const TxtViewer = ({ url }: ITxtViewer) => {
	const [text, setText] = useState<string>('');

	useEffect(() => {
		fetch(url)
			.then(res => res.blob())
			.then(blob => blob.text())
			.then(text => setText(text))
			.catch(() => enqueueSnackbar(Messages.ERROR_REPEAT, { variant: 'error' }));
	}, [url]);

	return (
		<Box
			sx={{
				width: '100%',
				maxHeight: '80vh',
			}}
		>
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
		</Box>
		)
};
