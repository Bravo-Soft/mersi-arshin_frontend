import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import type { IGroup } from 'types/group';

import { createSlice } from '@reduxjs/toolkit';
import { Roles } from 'constant/roles';

interface IUserState {
	id: string | null;
	group: IGroup | null;
	roles: Roles[];
}

const initialState: IUserState = {
	id: null,
	group: null,
	roles: [],
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserId: (state, action: PayloadAction<string>) => {
			state.id = action.payload;
		},

		setPermissions: (state, action: PayloadAction<IGroup>) => {
			state.group = action.payload;
		},

		setRoles: (state, action) => {
			state.roles = action.payload;
		},

		resetUserState: () => initialState,
	},
});

export const selectUserPermissions = ({ user }: RootState) => ({
	columnPinning: user.group?.isFreezeColumns,
	rowPinning: user.group?.isRowPinning,
	multipleColumnsFiltering: user.group?.isMultipleFilter,
	columnReorder: user.group?.isMoveColumns,
	hidingColumns: user.group?.isHideShowColumns,
	createVerificationSchedule: user.group?.isCreateVerificationSchedule,
	maxCountTemplates: user.group?.maxCountCustumTemplateTable,
	printingLabels: user.group?.isPrintLabel,
	notifications: user.group?.isNotification,
	isXLSXEnabled: user.group?.isUplodingXLSX,
	isCSVEnabled: user.group?.isUplodingCSV,
	attachFiles: user.group?.isStoreCertificates,
	hasChoiceMonth: user.group?.isChoiceMounth,
	hasChooseExpiredValue: user.group?.isChooseExpiredValue,
	hasFavorites: user.group?.IsFavoriteIdsEnabled,
	maxCountRowTable: user.group?.maxCountRowTable,
	maxSizeOfSpacePerPosition: user.group?.maxSizeOfSpacePerPosition,
	hasClipboard: true, // TODO: Добавить новый флаг
});

export const selectUserRoles = ({ user }: RootState) => ({
	isReader: user.roles.includes(Roles.USER_READER),
	isWriter: user.roles.includes(Roles.USER_WRITER),
	isAdmin: user.roles.includes(Roles.ADMIN),
});

export const userPath = userSlice.name;
export const userReducer = userSlice.reducer;
export const { setUserId, setPermissions, setRoles, resetUserState } = userSlice.actions;
