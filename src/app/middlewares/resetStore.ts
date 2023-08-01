import { createListenerMiddleware, TypedStartListening } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from 'app/store';
import { resetCredentials } from 'features/auth/authSlice';

export const resetStoreListener = createListenerMiddleware();

export const startResetStoreListener = resetStoreListener.startListening as TypedStartListening<
	RootState,
	AppDispatch
>;

startResetStoreListener({
	actionCreator: resetCredentials,
	effect: async (action, listenerApi) => {
		await listenerApi.delay(1000);
		await listenerApi.getOriginalState();
	},
});
