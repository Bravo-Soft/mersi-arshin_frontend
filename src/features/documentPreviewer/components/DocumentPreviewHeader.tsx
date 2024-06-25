import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface IDocumentPreviewHeader {
	closePreviewLayout: () => void;
	filename: string | undefined;
}

export const DocumentPreviewHeader = ({ closePreviewLayout, filename }: IDocumentPreviewHeader) => {
	return (
		<Box
			sx={{
				backgroundColor: 'white',
				maxWidth: '100%',
				height: '64px',
				padding: '8px 24px 8px 0px',
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				borderRadius: '8px 8px 0 0',
			}}
		>
			<Box
			component={'label'}
			sx={{
				maxWidth: '50vw',
				maxHeight: '1.5rem',
				fontWeight: '500',
				padding: '0px 0px 0px 5vw',
				wordWrap: 'break-word',
				overflowY: 'auto',
				msOverflowStyle: 'none',
				scrollbarWidth: 'none',
			}}
			>{filename}</Box>
			<Button variant='contained' onClick={closePreviewLayout}>
				Выйти из режима предпросмотра
			</Button>
		</Box>
	);
};
