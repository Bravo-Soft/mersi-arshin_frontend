import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'app/store';
import { Messages } from 'constant/messages';

export type SmartDialogVariants = 'payment' | 'deleting';

interface ISmartDialogOptions {
	isOpen: boolean;
	content: Messages;
}

type ISmartDialogState = Record<SmartDialogVariants, ISmartDialogOptions>

interface IChangeSmartDialogAction extends Omit<ISmartDialogOptions, 'content'> {
	content?: Messages;
	variant: SmartDialogVariants;
}

const initialState: ISmartDialogState = {
	payment: {
		isOpen: false,
		content: Messages.MODULE_IS_NOT_PAID,
	},
	deleting: {
		isOpen: false,
		content: Messages.DELETE_MESSAGE,
	},
};

const smartDialogSlice = createSlice({
	name: 'smartDialog',
	initialState,
	reducers: {
		changeSmartDialogState: (state, action: PayloadAction<IChangeSmartDialogAction>) => {
			const { variant, isOpen, content } = action.payload;
			state[variant].isOpen = isOpen;

			if (content) {
				state[variant].content = content;
			}
		},

		resetSmartDialogState: () => initialState,
	},
});

export const selectPaymentVariant = (state: RootState) => state.smartDialog.payment;
export const selectDeletingVariant = (state: RootState) => state.smartDialog.deleting;

export const smartDialogPath = smartDialogSlice.name;
export const smartDialogReducer = smartDialogSlice.reducer;
export const { changeSmartDialogState, resetSmartDialogState } = smartDialogSlice.actions;
