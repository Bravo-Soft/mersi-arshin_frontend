import CssBaseline from '@mui/material/CssBaseline';
import WithCookie from 'hoc/WithCookie';
import SnackbarProvider from 'features/snackbar/SnackbarProvider';
import { AppRouter } from 'pages/router';

function App() {
	return (
		<SnackbarProvider>
			<WithCookie>
				<CssBaseline />
				<AppRouter />
			</WithCookie>
		</SnackbarProvider>
	);
}

export default App;
