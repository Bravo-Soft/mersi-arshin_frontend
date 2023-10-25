import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { SnackbarProvider as LibSnackbarProvider } from 'notistack';
import type { PropsWithChildren } from 'react';

import { StyledSnackbarProvider } from './StyledSnackbarProvider';
import { useClosableSnackbar } from './useClosableSnackbar';

export default function SnackbarProvider({ children }: PropsWithChildren) {
	const [ref, onClick] = useClosableSnackbar();

	return (
		<LibSnackbarProvider
			ref={ref}
			hideIconVariant
			TransitionComponent={Slide}
			TransitionProps={{ direction: 'up' }}
			autoHideDuration={5000}
			maxSnack={3}
			action={key => (
				<IconButton onClick={onClick(key)}>
					<CloseIcon />
				</IconButton>
			)}
			Components={{
				default: StyledSnackbarProvider,
				success: StyledSnackbarProvider,
				error: StyledSnackbarProvider,
				info: StyledSnackbarProvider,
				warning: StyledSnackbarProvider,
			}}
		>
			{children}
		</LibSnackbarProvider>
	);
}
