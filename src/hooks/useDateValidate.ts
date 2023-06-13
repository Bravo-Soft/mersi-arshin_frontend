import { compareAsc, format } from 'date-fns';

import { formatVariant } from 'constant/dateFormat';

/**
 * Для постоянного отслеживания данных из инпута дат, необходимо использовать метод `watch`
 * из библиотеки `react-hook-form`
 */
export const useDateValidate = ({
	productionDateValue,
	dateOfNextVerificationValue,
	verificationDateValue,
}: ValidationDateValues) => {
	const productionDate = {
		lessOrEqualThenVerificationDate: (date: Date) =>
			compareAsc(date, verificationDateValue) !== 1 ||
			`Дата производства должна идти раньше или быть равной дате поверки (${format(
				verificationDateValue,
				formatVariant
			)})`,

		lessOrEqualThenNextVerificationDate: (date: Date) =>
			compareAsc(date, dateOfNextVerificationValue) !== 1 ||
			`Дата производства должна идти раньше даты следующей поверки, либо быть равной ей (${format(
				dateOfNextVerificationValue,
				formatVariant
			)})`,
	};

	const verificationDate = {
		moreOrEqualThenproductionDate: (date: Date) =>
			compareAsc(date, productionDateValue) !== -1 ||
			`Дата поверки должна идти позже даты производства, либо быть равной ей (${format(
				productionDateValue,
				formatVariant
			)})`,

		lessOrEqualThenDateOfNextVerification: (date: Date) =>
			compareAsc(date, dateOfNextVerificationValue) !== 1 ||
			`Дата поверки должна идти раньше даты следующей поверки, либо быть равной ей (${format(
				dateOfNextVerificationValue,
				formatVariant
			)})`,
	};

	const dateOfTheNextVerification = {
		moreOrEqualThenproductionDate: (date: Date) =>
			compareAsc(date, productionDateValue) !== -1 ||
			`Дата следующей поверки должна идти после даты производства, либо быть равной ей (${format(
				productionDateValue,
				formatVariant
			)})`,

		moreOrEqualThenVerificationDate: (date: Date) =>
			compareAsc(date, verificationDateValue) !== -1 ||
			`Дата следующей поверки должна идти после даты поверки, либо быть равной ей (${format(
				verificationDateValue,
				formatVariant
			)})`,
	};

	return { productionDate, verificationDate, dateOfTheNextVerification };
};

interface ValidationDateValues {
	productionDateValue: Date;
	dateOfNextVerificationValue: Date;
	verificationDateValue: Date;
}

export type UseDateValidateReturned = ReturnType<typeof useDateValidate>;
