import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import dayjs from "dayjs";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "dayjs/locale/ru";

import { register as registerServiceWorker } from "./serviceWorkerRegistration";
import { activateMuiX } from './utils/activate-mui-x';

import App from "App";
import { store } from "app/store";
import { theme } from "theme";


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

dayjs.locale("ru"); // глобальная локализация дат
activateMuiX()

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
