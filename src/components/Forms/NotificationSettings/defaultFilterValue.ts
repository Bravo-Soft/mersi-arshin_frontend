import { IOperatorsFIlters } from './types';

import { Tag } from 'constant/tag';

export const defaultFilterValue = (type: keyof IOperatorsFIlters) => {
	switch (type) {
		case 'dateFilters':
			return new Date();
		case 'sizesFilters':
			return Tag.SMALL;
		case 'suitability':
			return `true`;
		default:
			return '';
	}
};
