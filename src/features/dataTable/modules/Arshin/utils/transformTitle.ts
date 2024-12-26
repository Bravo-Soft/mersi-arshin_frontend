import dayjs from 'dayjs';

import { dayjsFormatVariant } from 'constant/dateFormat';

export const transformTitle = (title: string) => {
	const isoDateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z/;
	const match = title.match(isoDateRegex);
	if (match) {
		return `Запрос от ${dayjs(match[0]).format(dayjsFormatVariant)}`;
	}
	return title;
};
