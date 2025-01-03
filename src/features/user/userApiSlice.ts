import { setPermissions, setRole, setUserId } from './userSlice';

import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';
import type { Role } from 'constant/role';
import type { IGroup } from 'types/group';
import type { INotificationSettings } from 'types/notification';
import type { IPrintSettingResponse, IPrintSettings } from 'types/printSettings';
import type { IProfile } from 'types/profile';
import type { ITemplateConfig } from 'types/template';

export interface IUserDataResponse {
	id: string;
	role: Role;
	groupInfo: IGroup;
}

export type ICreateNewTemplateRequest = Omit<ITemplateConfig, 'id'>;

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getUserData: builder.query<IUserDataResponse, void>({
			query: () => API.user.default,
			providesTags: () => ['User'],
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;

				dispatch(setUserId(data.id));
				dispatch(setPermissions(data.groupInfo));
				dispatch(setRole(data.role));
			},
		}),

		getUserPrintSettings: builder.query<IPrintSettings, void>({
			query: () => API.user.printSettings,
			transformResponse: (response: IPrintSettingResponse) => response.params,
			providesTags: ['PrintSettings'],
		}),

		updateUserPrintSettings: builder.mutation<IPrintSettings, IPrintSettingResponse>({
			query: body => ({
				url: API.user.printSettings,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['PrintSettings'],
		}),

		getUserProfile: builder.query<IProfile, void>({
			query: () => API.user.profile.default,
			providesTags: ['Profile'],
		}),

		updateUserProfile: builder.mutation<IProfile, IProfile>({
			query: body => ({
				url: API.user.profile.default,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Profile'],
		}),

		getUserNotification: builder.query<INotificationSettings, void>({
			query: () => API.user.notification,
			providesTags: ['Notification'],
		}),

		updateUserNotification: builder.mutation<INotificationSettings, INotificationSettings>({
			query: body => ({
				url: API.user.notification,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Notification'],
		}),
	}),
});

export const {
	useGetUserDataQuery,
	useGetUserProfileQuery,
	useUpdateUserProfileMutation,
	usePrefetch,
	useGetUserNotificationQuery,
	useUpdateUserNotificationMutation,
	useGetUserPrintSettingsQuery,
	useUpdateUserPrintSettingsMutation,
} = userApiSlice;
