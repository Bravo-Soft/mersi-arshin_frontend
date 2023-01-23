import App from 'App';
import ReactDOM from 'react-dom/client';

import { theme } from 'theme';
import { ThemeProvider } from '@mui/material/styles';
import { LicenseInfo } from '@mui/x-license-pro';
import { persistor, store } from 'app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { getEnvValue } from 'utils/getEnvValue';

LicenseInfo.setLicenseKey(getEnvValue('LICENSE_KEY'));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<PersistGate loading={null} persistor={persistor}>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	</PersistGate>
);
