import App from 'App';
import ReactDOM from 'react-dom/client';
import ruLocale from 'date-fns/locale/ru';

import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ruRU } from '@mui/x-date-pickers/locales';
import { LicenseInfo } from '@mui/x-license-pro';
import { store } from 'app/store';
import { LICENSE_KEY } from 'constant/licenseKey';
import { Provider } from 'react-redux';
import { theme } from 'theme';
import { register as registerServiceWorker } from './serviceWorkerRegistration';

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
