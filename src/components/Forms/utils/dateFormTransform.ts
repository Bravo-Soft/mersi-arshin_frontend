import type { IDataItemWithDates } from 'types/dataItem';
import { createDateISO } from 'utils/createDateISO';

export type UpdatePropsType =
	| Omit<IDataItemWithDates, 'userIds'>
	| Omit<IDataItemWithDates, 'userIds' | 'id'>;

export const dateFormTransform = <T extends UpdatePropsType>(data: T) => {
	const {
		dateOfTheNextVerification,
		productionDate,
		verificationDate,
		suitability,
		interVerificationInterval,
		cost,
		dateOfCommissioning,
		...other
	} = data;

	return {
		...other,
		cost: parseFloat(cost).toFixed(2),
		interVerificationInterval: Number(interVerificationInterval),
		suitability: JSON.parse(suitability),
		dateOfTheNextVerification: createDateISO(dateOfTheNextVerification),
		productionDate: createDateISO(productionDate),
		verificationDate: createDateISO(verificationDate),
		dateOfCommissioning: createDateISO(dateOfCommissioning),
	};
};
