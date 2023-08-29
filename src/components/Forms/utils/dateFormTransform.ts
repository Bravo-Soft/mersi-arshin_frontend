import type { IDataItemWithDates } from 'types/dataItem';
import { createDateISO } from 'utils/createDateISO';

export const dateFormTransform = <T extends Omit<IDataItemWithDates, 'id' | 'userIds'>>(
	data: T
) => {
	const { dateOfTheNextVerification, productionDate, verificationDate, ...other } = data;
	return {
		...other,
		dateOfTheNextVerification: createDateISO(dateOfTheNextVerification),
		productionDate: createDateISO(productionDate),
		verificationDate: createDateISO(verificationDate),
	};
};
