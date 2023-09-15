import dayjs from 'dayjs';

import { dayjsFormatVariant } from 'constant/dateFormat';
import type { ITag, ITagParameters } from 'types/tag';

export interface ISortedTagItems {
	id: string;
	size: string;
	tagsPrint: ITagParameters[];
}

export const printingSort = (tag: ITag) => {
	const copy = structuredClone(tag);

	return Object.keys(copy)
		.filter(e => e !== 'size' && e !== 'id')
		.map(e => copy[e]);
};

const dateArray = ['Дата производства', 'Дата следующей поверки', 'Дата поверки'];

export const printingManySort = (tags: ITag[]): ISortedTagItems[] => {
	return tags.map(({ id, size, ...el }) => ({
		id,
		size,
		tagsPrint: [...Object.values(el)].map(e => {
			return dateArray.includes(e.translatedKey)
				? { ...e, value: dayjs(e.value).format(dayjsFormatVariant) }
				: e;
		}),
	}));
};
