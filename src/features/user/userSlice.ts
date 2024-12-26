import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createSelector } from '@reduxjs/toolkit';

import type { RootState } from 'app/store';
import { Role } from 'constant/role';
import type { IGroup } from 'types/group';

interface IUserState {
	id: string | null;
	role: Role | null;
	groupInfo: IGroup | null;
}

const initialState: IUserState = {
	id: null,
	groupInfo: null,
	role: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserId: (state, action: PayloadAction<string>) => {
			state.id = action.payload;
		},

		setPermissions: (state, action: PayloadAction<IGroup>) => {
			state.groupInfo = action.payload;
		},

		setRole: (state, action: PayloadAction<Role>) => {
			state.role = action.payload;
		},

		resetUserState: () => initialState,
	},
});

export const selectUserPermissions = createSelector(
	[(state: RootState) => state.user.groupInfo],
	groupInfo => ({
		maxRowsPerTable: groupInfo?.maxRowsPerTable ?? 0,
		maxNumberUserTemplates: groupInfo?.maxNumberUserTemplates ?? 0,
		maxNumberUsersAccountGroup: groupInfo?.maxNumberUsersAccountGroup ?? 0,
		isGroupAdministration: groupInfo?.isGroupAdministration ?? false,
		isPrintLabel: groupInfo?.isPrintLabel ?? false,
		isReceiveNotifications: groupInfo?.isReceiveNotifications ?? false,
		isFileStorage: groupInfo?.isFileStorage ?? false,
		maxSizePerRow: groupInfo?.maxSizePerRow ?? 0,
		isArshin: groupInfo?.hasArhinIntegration ?? false,
	})
);

export const selectUserId = (state: RootState) => state.user.id;

export const selectUserRoles = createSelector([(state: RootState) => state.user.role], role => ({
	isReader: role === Role.USER_READER,
	isWriter: role === Role.USER_WRITER,
	isAdmin: role === Role.SUPER_ADMIN,
}));

export const userPath = userSlice.name;
export const userReducer = userSlice.reducer;
export const { setUserId, setPermissions, setRole, resetUserState } = userSlice.actions;
