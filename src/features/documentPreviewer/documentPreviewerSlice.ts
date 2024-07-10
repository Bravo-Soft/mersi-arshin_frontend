import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'app/store';

interface IDocumentPreviewerState {
	isFailed: boolean;
}

const initialState: IDocumentPreviewerState = {
	isFailed: false,
};

const documentPreviewerSlice = createSlice({
	name: 'documentPreviewer',
	initialState,
	reducers: {
		setPreviewerIsFailed: (state, action) => {
			state.isFailed = action.payload;
		},
	},
});

export const selectIsPreviewerFailed = (state: RootState) => state.documentPreviewer.isFailed;

export const { setPreviewerIsFailed } = documentPreviewerSlice.actions;
export const documentPreviewerReducer = documentPreviewerSlice.reducer;
export const documentPreviewerPath = documentPreviewerSlice.name;
