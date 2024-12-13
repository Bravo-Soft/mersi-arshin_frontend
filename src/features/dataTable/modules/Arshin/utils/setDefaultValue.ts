import dayjs, { Dayjs } from 'dayjs';

import { IRequestItem } from 'types/arshinIntegration';

export const setDefaultValue = (data?: IRequestItem | null) => {
	if (data) {
		const { id, name, period, range, sendEmail, ...other } = data;

		return {
			id,
			name,
			period,
			sendEmail,
			range: [dayjs(range[0]), dayjs(range[1])] as [Dayjs, Dayjs],
		};
	}
};
