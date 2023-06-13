
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ruRU } from '@mui/x-date-pickers/locales';
import { LicenseInfo } from '@mui/x-license-pro';
import ruLocale from 'date-fns/locale/ru';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { register as registerServiceWorker } from './serviceWorkerRegistration';

import App from 'App';
import { store } from 'app/store';
import { LICENSE_KEY } from 'constant/licenseKey';
import { theme } from 'theme';

LicenseInfo.setLicenseKey(LICENSE_KEY);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<LocalizationProvider
				adapterLocale={ruLocale}
				localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
				dateAdapter={AdapterDateFns}
			>
				<App />
			</LocalizationProvider>
		</ThemeProvider>
	</Provider>
);

registerServiceWorker();
