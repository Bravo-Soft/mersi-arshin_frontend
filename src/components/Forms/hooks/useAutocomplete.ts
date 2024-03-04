import { validateAutcompleteParams } from '../utils/validateAutocomplete';

import { useGetAllDataQuery } from 'features/dataTable/dataTableApiSlice';
import type { IDataItem } from 'types/dataItem';

export type AutocompleteKeysType = keyof Omit<
	IDataItem,
	| 'id'
	| 'size'
	| 'userIds'
	| 'suitability'
	| 'verificationDate'
	| 'dateOfTheNextVerification'
	| 'productionDate'
	| 'verificationControlInStateRegister'
	| 'interVerificationInterval'
>;

const defaultKeys: AutocompleteKeysType[] = [
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
	'location',
	'responsible',
	'fgisUrl',
	'additionalData',
	'methodology',
	'cost',
	'view',
];

const defaultValue = {} as Record<AutocompleteKeysType, string[]>;

export const useFilterAutocomplete = () => {
	const { data: loadedData = [] } = useGetAllDataQuery();

	const filteredAValue = validateAutcompleteParams(
		defaultKeys
			.map(key => loadedData.map(item => item[key]))
			.reduce((acc, element, index) => ({ ...acc, [defaultKeys[index]]: element }), defaultValue)
	);

	return { ...filteredAValue };
};
