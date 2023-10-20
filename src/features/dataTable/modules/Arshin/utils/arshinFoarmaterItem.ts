import { IDataItemWithDates } from 'types/dataItem';
import { createDateISO } from 'utils/createDateISO';

export const arshinFoarmaterItem = <T extends Omit<IDataItemWithDates, 'id' | 'documents'>>(
	data: T
) => {
	const {
		dateOfTheNextVerification,
		productionDate,
		verificationDate,
		suitability,
		userIds,
		...other
	} = data;
	return {
		...other,
		suitability: JSON.parse(suitability),
		dateOfTheNextVerification: createDateISO(dateOfTheNextVerification),
		productionDate: createDateISO(productionDate),
		verificationDate: createDateISO(verificationDate),
	};
};
