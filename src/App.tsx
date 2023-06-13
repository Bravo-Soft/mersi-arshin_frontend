import CssBaseline from '@mui/material/CssBaseline';

import { OnlineStatus } from 'features/onlineStatus/OnlineStatus';
import SnackbarProvider from 'features/snackbar/SnackbarProvider';
import WithCookie from 'hoc/WithCookie';
import { AppRouter } from 'pages/router';

function App() {
	return (
		<SnackbarProvider>
			<WithCookie>
				<OnlineStatus />
				<CssBaseline />
				<AppRouter />
			</WithCookie>
		</SnackbarProvider>
	);
}

export default App;
