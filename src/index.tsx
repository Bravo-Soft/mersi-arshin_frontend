import App from 'App';
import ReactDOM from 'react-dom/client';

import { theme } from 'theme';
import { ThemeProvider } from '@mui/material/styles';
import { LicenseInfo } from '@mui/x-license-pro';
import { persistor, store } from 'app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { LICENSE_KEY } from 'constant/licenseKey';
import { register as registerServiceWorker } from './serviceWorkerRegistration';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';

LicenseInfo.setLicenseKey(LICENSE_KEY);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<PersistGate loading={null} persistor={persistor}>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<LocalizationProvider adapterLocale={ruLocale} dateAdapter={AdapterDateFns}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</LocalizationProvider>
			</ThemeProvider>
		</Provider>
	</PersistGate>
);

registerServiceWorker();
