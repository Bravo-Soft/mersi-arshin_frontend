import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { LicenseInfo } from "@mui/x-license-pro";
import dayjs from "dayjs";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { register as registerServiceWorker } from "./serviceWorkerRegistration";

import App from "App";
import { store } from "app/store";
import { LICENSE_KEY } from "constant/licenseKey";
import { theme } from "theme";

import "dayjs/locale/ru";


LicenseInfo.setLicenseKey(LICENSE_KEY);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

dayjs.locale("ru"); // глобальная локализация дат

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <App />
      </LocalizationProvider>
    </ThemeProvider>
  </Provider>
);

registerServiceWorker();
