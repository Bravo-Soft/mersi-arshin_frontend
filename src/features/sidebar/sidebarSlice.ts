import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';

import { createSelector } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type SidebarSelectors =
	| 'CreateDataItem'
	| 'EditDataItem'
	| 'VerificateDataItem'
	| 'FilesDataItem'
	| 'NotificationSettings'
	| 'UserProfile'
	| 'PrintSettings'
	| 'idle';

export type SidebarPages = 'home' | 'print';

export interface ISidebarOptions {
	open: boolean;
	selector: SidebarSelectors;
}

export interface ISidebarState extends Record<SidebarPages, ISidebarOptions> {}

const initialState: ISidebarState = {
	home: {
		open: false,
		selector: 'idle',
	},
	print: {
		open: false,
		selector: 'idle',
	},
};

export interface ISetSidebarSelectorAction {
	page: SidebarPages;
	selector: SidebarSelectors;
}

interface IChangeSidebarIsOpenAction {
	page: SidebarPages;
	open: boolean;
}

const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState,
	reducers: {
		setSidebarSelector: (state, action: PayloadAction<ISetSidebarSelectorAction>) => {
			const { page, selector } = action.payload;
			if (state[page].selector !== selector) {
				state[page].selector = selector;
			}
		},

		changeSidebarIsOpen: (state, action: PayloadAction<IChangeSidebarIsOpenAction>) => {
			const { page, open } = action.payload;
			if (state[page].open !== open) {
				state[page].open = open;
			}
		},
		resetSidebarState: () => initialState,
	},
});

export const selectSidebarStateOfHomePage = (state: RootState) => state.sidebar.home;
export const selectSidebarStateOfPrintPage = (state: RootState) => state.sidebar.print;

export const selectUserProfileIsOpen = createSelector(
	selectSidebarStateOfHomePage,
	selectSidebarStateOfPrintPage,
	(homeState, printState) => {
		const isUserProfileOpenInHomePage = homeState.open && homeState.selector === 'UserProfile';
		const isUserProfileOpenInPrintPage = printState.open && printState.selector === 'UserProfile';

		return isUserProfileOpenInHomePage || isUserProfileOpenInPrintPage;
	}
);

export const sidebarPath = sidebarSlice.name;
export const sidebarReducer = sidebarSlice.reducer;

export const { setSidebarSelector, changeSidebarIsOpen, resetSidebarState } = sidebarSlice.actions;
