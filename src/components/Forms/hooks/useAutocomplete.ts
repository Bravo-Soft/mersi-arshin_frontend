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

export const useAutocomplete = (keysArray: AutocompleteKeysType[]) => {
	const { data: loadedData = [] } = useGetAllDataQuery();

	return validateAutcompleteParams(
		keysArray
			.map(key => loadedData.map(item => item[key]))
			.reduce((acc, el, i) => {
				return { ...acc, [keysArray[i]]: el };
			}, {}) as Record<AutocompleteKeysType, string[]>
	);
};
