import { Container } from '@mui/material';
import type { PropsWithChildren } from 'react';

export const DocumentPreviewLayout = ({ children }: PropsWithChildren): JSX.Element => {
	return (
		<Container
			sx={{
				position: 'absolute',
				top: '64px',
				left: 0,
				backgroundColor: 'rgba(1,78,95,0.5)',
				height: 'calc(100vh - 64px)',
				width: '100vw',
				padding: '16px',
				maxWidth: 'unset !important',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 1500,
			}}
		>
			{children}
		</Container>
	);
};
