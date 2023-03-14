import App from 'App';
import ReactDOM from 'react-dom/client';

import { theme } from 'theme';
import { ThemeProvider } from '@mui/material/styles';
import { LicenseInfo } from '@mui/x-license-pro';
import { persistor, store } from 'app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import QuickTour from 'features/quickTour/components/QuickTour';
import { LICENSE_KEY } from 'constant/licenseKey';

LicenseInfo.setLicenseKey(LICENSE_KEY);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<PersistGate loading={null} persistor={persistor}>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<QuickTour>
						<App />
					</QuickTour>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	</PersistGate>
);
