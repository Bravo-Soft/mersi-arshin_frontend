import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { apiSlice } from './apiSlice';
import { resetStoreListener } from './middlewares';

import { authPath, authReducer } from 'features/auth/authSlice';
import { dataTablePath, dataTableReducer } from 'features/dataTable/dataTableSlice';
import {
	arshinTablePath,
	arshinTableReducer,
} from 'features/dataTable/modules/Arshin/arshinTableSlice';
import {
	dialogArshinPath,
	dialogArshinReducer,
} from 'features/dataTable/modules/Arshin/dialogArshinSlice';
import {
	eventSourcePath,
	eventSourceReducer,
} from 'features/dataTable/modules/Arshin/eventSourceSlice';
import { historyTablePath, historyTableReducer } from 'features/historyTable/historyTableSlice';
import { quickTourPath, quickTourReducer } from 'features/quickTour/components/quickTourSlice';
import { sidebarPath, sidebarReducer } from 'features/sidebar/sidebarSlice';
import { smartDialogPath, smartDialogReducer } from 'features/smartDialog/smartDialogSlice';
import { userPath, userReducer } from 'features/user/userSlice';

const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	[authPath]: authReducer,
	[sidebarPath]: sidebarReducer,
	[dataTablePath]: dataTableReducer,
	[userPath]: userReducer,
	[smartDialogPath]: smartDialogReducer,
	[quickTourPath]: quickTourReducer,
	[arshinTablePath]: arshinTableReducer,
	[dialogArshinPath]: dialogArshinReducer,
	[eventSourcePath]: eventSourceReducer,
	[historyTablePath]: historyTableReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV === 'development',
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().prepend(resetStoreListener.middleware).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
