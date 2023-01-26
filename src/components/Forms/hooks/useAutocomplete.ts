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

const defaultkeys: AutocompleteKeysType[] = [
	'name',
	'type',
	'factoryNumber',
	'inventoryNumber',
	'division',
	'typeOfWork',
	'condition',
	'stateRegister',
	'certificate',
	'organization',
	'accuracyClass',
	'measurementLimit',
	'notes',
];

const defaultValue = {} as Record<AutocompleteKeysType, string[]>;

export const useFilterAutocomplete = () => {
	const { data: loadedData = [] } = useGetAllDataQuery();

	const filteredAValue = validateAutcompleteParams(
		defaultkeys
			.map(key => loadedData.map(item => item[key]))
			.reduce((acc, element, index) => {
				return { ...acc, [defaultkeys[index]]: element };
			}, defaultValue)
	);

	return { ...filteredAValue };
};
