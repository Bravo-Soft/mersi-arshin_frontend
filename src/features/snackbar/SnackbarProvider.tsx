import { SnackbarProvider as LibSnackbarProvider } from 'notistack';
import type { PropsWithChildren } from 'react';
import { useClosableSnackbar } from './useClosableSnackbar';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { StyledSnackbarProvider } from './StyledSnackbarProvider';

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
