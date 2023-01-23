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

export const useAutocomplete = () => {
	const { data: loadedData = [] } = useGetAllDataQuery();

	const createdArrayAutocomplete = loadedData.reduce<AutocompleteType>(
		(acc, { name, type, division, condition, accuracyClass, notes }): AutocompleteType => {
			return {
				name: validateAutcompleteParams(acc.name, name),
				type: validateAutcompleteParams(acc.type, type),
				notes: validateAutcompleteParams(acc.notes, notes),
				division: validateAutcompleteParams(acc.division, division),
				condition: validateAutcompleteParams(acc.condition, condition),
				accuracyClass: validateAutcompleteParams(acc.accuracyClass, accuracyClass),
			};
		},
		defaultValue
	);
	return Object.entries(createdArrayAutocomplete).reduce((acc, [key, value]) => {
		return { ...acc, [key]: getArrayWithoutDuplicates(...value) };
	}, {});
};
