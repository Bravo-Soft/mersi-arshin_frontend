import { useGetAllDataQuery } from 'features/dataTable/dataTableApiSlice';
import { validateAutcompleteParams } from '../utils/validateAutocomplete';
import { getArrayWithoutDuplicates } from 'utils/getArrayWithoutDuplicates';

import type { IDataItem } from 'types/dataItem';

type AutocompleteKeysType = 'name' | 'type' | 'division' | 'condition' | 'accuracyClass' | 'notes';

export type AutocompleteType = Record<AutocompleteKeysType, IDataItem[AutocompleteKeysType][]>;

const defaultValue = {
	name: [],
	type: [],
	notes: [],
	division: [],
	condition: [],
	accuracyClass: [],
};

export const useAutocomplete = (keysArray: string[]) => {
	const { data: loadedData = [] } = useGetAllDataQuery();

	const createdArrayAutocompleteFirst = loadedData.reduce((acc, cc) => {}, {});

	// const createdArrayAutocompleteFirst = loadedData
	// 	.map(e =>
	// 		Object.entries(e).filter(([key, value]) => {
	// 			return keysArray.includes(key);
	// 		})
	// 	)
	// 	.reduce((obj, [keys, values]) => {
	// 		return { ...obj, [keys]: values };
	// 	}, {});

	return createdArrayAutocompleteFirst;
};
// const createdArrayAutocompleteFirst = Object.entries(loadedData).filter(([key, value]) => {
// 	console.log('keysArray', keysArray);
// 	console.log('value', value);
// 	return keysArray.includes(key);
// });
// .reduce((obj, [keys, value]) => {
// 	return { ...obj, keys: value };
// }, {});

// return createdArrayAutocompleteFirst;

// const createdArrayAutocomplete = loadedData.reduce<AutocompleteType>(
// 	(acc, { name, type, division, condition, accuracyClass, notes }): AutocompleteType => {
// 		return {
// 			name: validateAutcompleteParams(acc.name, name),
// 			type: validateAutcompleteParams(acc.type, type),
// 			notes: validateAutcompleteParams(acc.notes, notes),
// 			division: validateAutcompleteParams(acc.division, division),
// 			condition: validateAutcompleteParams(acc.condition, condition),
// 			accuracyClass: validateAutcompleteParams(acc.accuracyClass, accuracyClass),
// 		};
// 	},
// 	defaultValue
// );
// return Object.entries(createdArrayAutocomplete).reduce((acc, [key, value]) => {
// 	return { ...acc, [key]: getArrayWithoutDuplicates(...value) };
// }, {});
