import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';
import { setPermissions, setRoles, setUserId } from './userSlice';

import type { IGroup } from 'types/group';
import type { INotificationSettings } from 'types/notification';
import type { IPrintSettingResponse, IPrintSettings } from 'types/printSettings';
import type { IProfile } from 'types/profile';
import type { Role } from 'types/role';
import type { ITemplateСonfig } from 'types/template';

export interface IUserDataResponse {
	id: string;
	roles: Role[];
	group: IGroup;
}

export interface ICreateNewTemplateRequest extends Omit<ITemplateСonfig, 'id'> {}

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getUserData: builder.query<IUserDataResponse, void>({
			query: () => API.user.default,
			providesTags: () => ['User'],
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;

				dispatch(setUserId(data.id));
				dispatch(setPermissions(data.group));
				dispatch(setRoles(data.roles));
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
			query: () => API.user.profile,
			providesTags: ['Profile'],
		}),

		updateUserProfile: builder.mutation<IProfile, IProfile>({
			query: ({ email, ...body }) => ({
				url: API.user.profile,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Profile'],
		}),

		getUserNotification: builder.query<INotificationSettings, void>({
			query: () => API.user.notifications,
			providesTags: ['Notification'],
		}),

		updateUserNotification: builder.mutation<INotificationSettings, INotificationSettings>({
			query: body => ({
				url: API.user.notifications,
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
