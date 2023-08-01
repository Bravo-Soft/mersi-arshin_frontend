import { createListenerMiddleware, TypedStartListening } from '@reduxjs/toolkit';

import { apiSlice } from 'app/apiSlice';
import { AppDispatch, RootState } from 'app/store';
import { resetCredentials } from 'features/auth/authSlice';
import { resetSelectedDataItem, resetSelectedModel } from 'features/dataTable/dataTableSlice';
import { resetQuickTourState } from 'features/quickTour/components/quickTourSlice';
import { resetSidebarState } from 'features/sidebar/sidebarSlice';
import { resetSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { resetUserState } from 'features/user/userSlice';

export const resetStoreListener = createListenerMiddleware();

const startResetStoreListener = resetStoreListener.startListening as TypedStartListening<
	RootState,
	AppDispatch
>;

startResetStoreListener({
	actionCreator: resetCredentials,
	effect: async (action, listenerApi) => {
		await listenerApi.delay(100);
		listenerApi.dispatch(resetUserState());
		listenerApi.dispatch(resetSidebarState());
		listenerApi.dispatch(resetSelectedDataItem());
		listenerApi.dispatch(resetSelectedModel());
		listenerApi.dispatch(resetSmartDialogState());
		listenerApi.dispatch(resetQuickTourState());
		listenerApi.dispatch(apiSlice.util.resetApiState());
	},
});
