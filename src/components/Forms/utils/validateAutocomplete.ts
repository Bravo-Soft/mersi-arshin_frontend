import { isValueDefined } from 'guards/isValueDefined';
import { getArrayWithoutDuplicates } from 'utils/getArrayWithoutDuplicates';

import type { AutocompleteKeysType } from '../hooks/useAutocomplete';

export const validateAutcompleteParams = (obj: Record<AutocompleteKeysType, string[]>) => {
	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [key, validateAutcompleteParams2(value)])
	);
};

export const validateAutcompleteParams2 = (array: string[]) => {
	return getArrayWithoutDuplicates(
		...array
			.filter(e => isValueDefined(e))
			.filter(e => e)
			.map(str => deleteSpaces(str))
	);
};

export const deleteSpaces = (str: string) => str.replace(/\s+/g, ' ').trim();
