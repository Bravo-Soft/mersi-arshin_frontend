import { UpdatePropsType } from 'components/Forms/utils/dateFormTransform';
import { createDateISO } from 'utils/createDateISO';

export const arshinFormaterItem = <T extends UpdatePropsType>(data: T) => {
	const {
		dateOfTheNextVerification,
		productionDate,
		verificationDate,
		suitability,
		interVerificationInterval,
		cost,
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
	};
};
