import { isValueDefined } from 'guards/isValueDefined';

export const validateAutcompleteParams = (array: string[], str: string) =>
	isValueDefined(str) ? [...array, deleteSpaces(str)] : array;

export const deleteSpaces = (str: string) => str.replace(/\s+/g, ' ').trim();
