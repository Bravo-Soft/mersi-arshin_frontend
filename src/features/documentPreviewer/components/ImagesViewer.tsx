import Box from '@mui/material/Box';

interface ImagesViewer {
	url: string;
}

export const ImagesViewer = ({ url }: ImagesViewer) => {
	return (
		<Box sx={{ width: '100%', maxHeight: '80vh', backgroundColor: '#fff' }}>
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
		</Box>
	);
};
