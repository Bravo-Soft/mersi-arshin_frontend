import storage from 'redux-persist/lib/storage';

import type { AnyAction, Reducer } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authPath, authReducer } from 'features/auth/authSlice';
import { dataTablePath, dataTableReducer } from 'features/dataTable/dataTableSlice';
import { notificationPath, notificationReducer } from 'features/notificator/notificatorSlice';
import { sidebarPath, sidebarReducer } from 'features/sidebar/sidebarSlice';
import { smartDialogPath, smartDialogReducer } from 'features/smartDialog/smartDialogSlice';
import { userPath, userReducer } from 'features/user/userSlice';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist';
import { apiSlice } from './apiSlice';
import { resetPath, resetReducer } from './resetSlise';

import type { PersistConfig } from 'redux-persist';

const config: PersistConfig<RootState> = {
	key: 'root',
	version: 1,
	storage,
	whitelist: [authPath],
};

const combineReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	[resetPath]: resetReducer,
	[authPath]: authReducer,
	[notificationPath]: notificationReducer,
	[sidebarPath]: sidebarReducer,
	[dataTablePath]: dataTableReducer,
	[userPath]: userReducer,
	[smartDialogPath]: smartDialogReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
	if (action.type === 'reset/clearStore') {
		state = {} as RootState;
	}

	return combineReducer(state, action);
};

const persistedReducer = persistReducer(config, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV === 'development',
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
