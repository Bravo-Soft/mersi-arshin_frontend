import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import type { VariantType } from 'notistack';

import { createSlice } from '@reduxjs/toolkit';

interface INotification {
	message: string;
	type: VariantType;
}

type NotificationState = INotification | null;

const initialState: NotificationState = null as NotificationState;

const notificatorSlice = createSlice({
	name: 'notificator',
	initialState,
	reducers: {
		showNotification: (_, action: PayloadAction<INotification>) => action.payload,
		resetNotificationState: () => initialState,
	},
});

export const selectNotification = (state: RootState) => state.notificator;

export const notificationReducer = notificatorSlice.reducer;
export const notificationPath = notificatorSlice.name;
export const { showNotification, resetNotificationState } = notificatorSlice.actions;
