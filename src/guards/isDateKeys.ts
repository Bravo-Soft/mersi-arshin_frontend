import type { IDataItem } from 'types/dataItem';

type DateKeys = 'productionDate' | 'verificationDate' | 'dateOfTheNextVerification';

export const isDateKeys = (key: keyof IDataItem): key is DateKeys => {
	return (
		key === 'productionDate' || key === 'verificationDate' || key === 'dateOfTheNextVerification'
	);
};
