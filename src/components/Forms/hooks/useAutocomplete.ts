import { useGetAllDataQuery } from 'features/dataTable/dataTableApiSlice';
import { validateAutcompleteParams } from '../utils/validateAutocomplete';

import type { IDataItem } from 'types/dataItem';

export type AutocompleteKeysType = keyof Omit<
	IDataItem,
	| 'id'
	| 'size'
	| 'userIds'
	| 'documents'
	| 'verificationDate'
	| 'dateOfTheNextVerification'
	| 'productionDate'
>;

const defaultValue = {} as Record<AutocompleteKeysType, string[]>;

export const useFilterAutocomplete = (keysArray: AutocompleteKeysType[]) => {
	const { data: loadedData = [] } = useGetAllDataQuery();

	const filteredAValue = validateAutcompleteParams(
		keysArray
			.map(key => loadedData.map(item => item[key]))
			.reduce((acc, el, i) => {
				return { ...acc, [keysArray[i]]: el };
			}, defaultValue)
	);

	return { ...filteredAValue };
};
