import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';

type GetNotificationsType = {
	header: string;
	id: string;
	message: string;
};

export const NotificationApiSLice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getNotifications: builder.query<GetNotificationsType[], void>({
			query: () => API.notification.getNotifications,
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
} = NotificationApiSLice;
