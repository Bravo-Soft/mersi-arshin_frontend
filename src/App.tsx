import CloseIcon from '@mui/icons-material/Close';
import CssBaseline from '@mui/material/CssBaseline';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import Notificator from 'features/notificator/Notificator';
import WithCookie from 'hoc/WithCookie';
import Navigation from 'navigation';

import { StyledSnackbarProvider } from 'features/notificator/StyledSnackbarProvider';
import { useClosableSnackbar } from 'features/notificator/useClosableSnackbar';
 
function App() {
	const [ref, onClick] = useClosableSnackbar();
	return (
		<StyledSnackbarProvider
			ref={ref}
			anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
			TransitionComponent={Grow}
			autoHideDuration={5000}
			maxSnack={3}
			hideIconVariant
			dense
			action={key => (
				<IconButton onClick={onClick(key)}>
					<CloseIcon />
				</IconButton>
			)}
		>
			<WithCookie>
				<CssBaseline />
				<Notificator />
				<Navigation />
			</WithCookie>
		</StyledSnackbarProvider>
	);
}

export default App;
