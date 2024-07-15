import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

import { ErrorOverlay } from 'features/dataTable/components/ErrorOverlay';

interface ImagesViewer {
	url: string;
}

export const ImagesViewer = ({ url }: ImagesViewer) => {
	const [isValid, setIsValid] = useState<boolean | null>(null);

	const isValidImage = (file: Blob): Promise<boolean> => {
		return new Promise(resolve => {
			const img = new Image();
			img.onload = () => resolve(true);
			img.onerror = () => resolve(false);
			img.src = URL.createObjectURL(file);
		});
	};

	useEffect(() => {
		const fetchAndValidateImage = async () => {
			try {
				const response = await fetch(url);
				const blob = await response.blob();
				const valid = await isValidImage(blob);
				setIsValid(valid);
			} catch (error) {
				setIsValid(false);
			}
		};

		fetchAndValidateImage();
	}, [url]);

	return (
		<Box sx={{ width: '100%', height: '100%', maxHeight: '80vh', backgroundColor: '#fff' }}>
			{isValid === false && <ErrorOverlay errorType='readError' />}
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
				/>
			)}
		</Box>
	);
};
