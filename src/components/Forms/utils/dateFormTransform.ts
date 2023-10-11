import type { IDataItemWithDates } from 'types/dataItem';
import { createDateISO } from 'utils/createDateISO';

export const dateFormTransform = <
	T extends Omit<IDataItemWithDates, 'id' | 'userIds' | 'documents'>
>(
	data: T
) => {
	const { dateOfTheNextVerification, productionDate, verificationDate, suitability, ...other } =
		data;
	return {
		...other,
		suitability: JSON.parse(suitability),
		dateOfTheNextVerification: createDateISO(dateOfTheNextVerification),
		productionDate: createDateISO(productionDate),
		verificationDate: createDateISO(verificationDate),
	};
};
