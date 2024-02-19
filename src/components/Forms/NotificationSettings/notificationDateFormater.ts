import dayjs from 'dayjs';

import { INotificationSettings } from 'types/notification';
import { createDateISO } from 'utils/createDateISO';

const valueGuard = (value: unknown): value is Date => value instanceof Date;

export const notificationDateFormater = ({ subscribedEmails, ...rest }: INotificationSettings) => {
	const subEmail = subscribedEmails.map(({ emailFilters, ...restEmail }) => {
		const conmfertEmailFilter = emailFilters.map(({ value, ...restFilter }) => {
			return {
				...restFilter,
				value: valueGuard(value) ? createDateISO(dayjs(value)) : value,
			};
		});
		return { ...restEmail, emailFilters: conmfertEmailFilter };
	});
	return { ...rest, subscribedEmails: subEmail };
};
