import type { AutocompleteKeysType } from '../hooks/useAutocomplete';

import { isValueDefined } from 'guards/isValueDefined';
import { getArrayWithoutDuplicates } from 'utils/getArrayWithoutDuplicates';

export const validateAutcompleteParams = (validateObject: Record<AutocompleteKeysType, string[]>) =>
	Object.fromEntries(
		Object.entries(validateObject).map(([key, value]) => [key, filtredInvalidValue(value)])
	);

export const filtredInvalidValue = (filteredArray: string[]) =>
	getArrayWithoutDuplicates(
		...filteredArray
			.filter(element => isValueDefined(element))
			.filter(element => element)
			.map(element => deleteSpaces(element))
	);

export const deleteSpaces = (str: string) => str.replace(/\s+/g, ' ').trim();
