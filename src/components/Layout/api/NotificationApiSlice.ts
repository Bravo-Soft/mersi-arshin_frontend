import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';

type GetNotificationsType = {
	header: string;
	id: string;
	message: string;
};

type NotificationRestType = {
	id: string;
	message: string;
};

export const NotificationApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getNotifications: builder.query<GetNotificationsType[], void>({
			query: () => API.notification.getNotifications,
			transformResponse: (res: NotificationRestType[]) => {
				return res.map(({ id, message }) => ({ id, ...JSON.parse(message) }));
			},
			providesTags: ['PushNotification'],
		}),
		readNotification: builder.mutation<void, string>({
			query: body => ({
				url: API.notification.readNotifications(body),
				method: 'PUT',
			}),
			invalidatesTags: ['PushNotification'],
		}),
		readAllNotification: builder.mutation<void, void>({
			query: body => ({
				url: API.notification.readAllNotifications,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['PushNotification'],
		}),
	}),
});

export const {
	useGetNotificationsQuery,
	useReadNotificationMutation,
	useReadAllNotificationMutation,
} = NotificationApiSlice;
