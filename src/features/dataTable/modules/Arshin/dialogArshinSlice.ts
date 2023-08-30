import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'app/store';

export type DialogVariants = 'synchronize' | 'deleting';

interface IDialogOptions {
	isOpen: boolean;
	content: string;
}

type ISmartDialogState = {
	synchronize: IDialogOptions;
	deleting: IDialogOptions;
	openFilterDialog: boolean;
};

interface IChangeDialogAction extends Omit<IDialogOptions, 'content'> {
	content?: string;
	variant: DialogVariants;
}

const initialState: ISmartDialogState = {
	synchronize: {
		isOpen: false,
		content: 'Будут обновлены только строки, по которым получены данные с ФГИС “Аршин”, 1 из 1',
	},
	deleting: {
		isOpen: false,
		content: 'При удалении данных строк будут потеряны все данные, полученные из ФГИС “Аршин”',
	},
	openFilterDialog: false,
};

const dialogArshinSlice = createSlice({
	name: 'dialogArshin',
	initialState,
	reducers: {
		changeDialogState: (state, action: PayloadAction<IChangeDialogAction>) => {
			const { variant, isOpen, content } = action.payload;
			state[variant].isOpen = isOpen;

			if (content) {
				state[variant].content = content;
			}
		},

		resetDialogState: () => initialState,

		openFilterDialogArshin: state => {
			state.openFilterDialog = true;
		},
		closeFilterDialogArshin: state => {
			state.openFilterDialog = false;
		},
	},
});

export const selectSynchronizeDialog = (state: RootState) => state.dialogArshin.synchronize;
export const selectDeletingDialog = (state: RootState) => state.dialogArshin.deleting;
export const selectOpenFilterDialogArshin = (state: RootState) =>
	state.dialogArshin.openFilterDialog;

export const dialogArshinPath = dialogArshinSlice.name;
export const dialogArshinReducer = dialogArshinSlice.reducer;
export const {
	changeDialogState,
	resetDialogState,
	openFilterDialogArshin,
	closeFilterDialogArshin,
} = dialogArshinSlice.actions;
