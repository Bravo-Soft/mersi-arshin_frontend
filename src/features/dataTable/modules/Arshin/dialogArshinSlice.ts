import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'app/store';

export type DialogVariants =
	| 'synchronize'
	| 'deleting'
	| 'validate'
	| 'createRequest'
	| 'editRequest'
	| 'deleteRequest'
	| null;

type ISmartDialogState = {
	variant: DialogVariants;
};

const initialState: ISmartDialogState = {
	variant: null,
};

const dialogArshinSlice = createSlice({
	name: 'dialogArshin',
	initialState,
	reducers: {
		changeDialogState: (state, action: PayloadAction<DialogVariants>) => {
			state.variant = action.payload;
		},

		resetDialogState: () => initialState,
	},
});

export const selectSynchronizeDialog = (state: RootState) =>
	state.dialogArshin.variant === 'synchronize';
export const selectValidateDialog = (state: RootState) => state.dialogArshin.variant === 'validate';
export const selectDeletingDialog = (state: RootState) => state.dialogArshin.variant === 'deleting';
export const selectCreatingRequestDialog = (state: RootState) =>
	state.dialogArshin.variant === 'createRequest';
export const selectEditingRequestDialog = (state: RootState) =>
	state.dialogArshin.variant === 'editRequest';
export const selectDeletingRequestDialog = (state: RootState) =>
	state.dialogArshin.variant === 'deleteRequest';

export const selectIsOpenDialog = (state: RootState) => Boolean(state.dialogArshin.variant);

export const dialogArshinPath = dialogArshinSlice.name;
export const dialogArshinReducer = dialogArshinSlice.reducer;
export const { changeDialogState, resetDialogState } = dialogArshinSlice.actions;
