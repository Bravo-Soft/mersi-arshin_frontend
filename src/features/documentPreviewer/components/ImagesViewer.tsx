import Box from '@mui/material/Box';
import { useState } from 'react';

import { ErrorOverlay } from 'features/dataTable/components/ErrorOverlay';

interface ImagesViewer {
	url: string;
}

export const ImagesViewer = ({ url }: ImagesViewer) => {
	const [isValid, setIsValid] = useState<boolean>(true);

	return (
		<Box sx={{ width: '100%', height: '100%', maxHeight: '80vh', backgroundColor: '#fff' }}>
			{isValid && (
				<Box
					component={'img'}
					src={url}
					alt=''
					sx={{
						width: '100%',
						height: '100%',
						objectFit: 'contain',
						objectPosition: 'center',
					}}
					onError={() => setIsValid(false)}
				/>
			)}
			{!isValid && <ErrorOverlay errorType='readError' />}
		</Box>
	);
};
