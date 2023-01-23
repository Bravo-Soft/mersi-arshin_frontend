import type { SnackbarKey, SnackbarProvider } from 'notistack';
import type { RefObject } from 'react';

import { useRef } from 'react';

type CloseCallback = (key: SnackbarKey) => () => void;

type UseSnackbarReturned = [RefObject<SnackbarProvider>, CloseCallback];

export const useClosableSnackbar = (): UseSnackbarReturned => {
	const snackbarRef = useRef<SnackbarProvider>(null); // ссылка создается для возможности закрытия уведомления в любом месте приложения

	const handleCloseSnackbar: CloseCallback = (key: SnackbarKey) => () => {
		snackbarRef.current?.closeSnackbar(key);
	};

	return [snackbarRef, handleCloseSnackbar];
};
