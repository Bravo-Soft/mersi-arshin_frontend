import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

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

export const selectUserPermissions = ({ user }: RootState) => ({
	maxRowsPerTable: user.groupInfo?.maxRowsPerTable ?? 0,
	maxNumberUserTemplates: user.groupInfo?.maxNumberUserTemplates ?? 0,
	maxNumberUsersAccountGroup: user.groupInfo?.maxNumberUsersAccountGroup ?? 0,
	isGroupAdministration: user.groupInfo?.isGroupAdministration ?? false,
	isPrintLabel: user.groupInfo?.isPrintLabel ?? false,
	isReceiveNotifications: user.groupInfo?.isReceiveNotifications ?? false,
	isFileStorage: user.groupInfo?.isFileStorage ?? false,
	maxSizePerRow: user.groupInfo?.maxSizePerRow ? user.groupInfo?.maxSizePerRow : 0,
	isArshin: user.groupInfo?.hasArhinIntegration ?? false,
});

export const selectUserId = (state: RootState) => state.user.id;

export const selectUserRoles = ({ user }: RootState) => ({
	isReader: user.role === Role.USER_READER,
	isWriter: user.role === Role.USER_WRITER,
	isAdmin: user.role === Role.SUPER_ADMIN,
});

export const userPath = userSlice.name;
export const userReducer = userSlice.reducer;
export const { setUserId, setPermissions, setRole, resetUserState } = userSlice.actions;
