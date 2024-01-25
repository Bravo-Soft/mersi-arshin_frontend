import dayjs, { Dayjs } from 'dayjs';
import { useFormContext } from 'react-hook-form';

import { dayjsFormatVariant } from 'constant/dateFormat';
import { IDataItemWithDates } from 'types/dataItem';

type FormType = Omit<IDataItemWithDates, 'userIds'>;

export const useValidateArshin = () => {
	const { watch } = useFormContext<Omit<IDataItemWithDates, 'userIds'>>();

	const watches = watch();

	const { productionDate } = watches;

	const verificationDateBefore = (
		verificationDate: Dayjs,
		{ dateOfTheNextVerification }: FormType
	) => {
		const verificationDateBeforeValid = !verificationDate.isAfter(dateOfTheNextVerification);
		return (
			verificationDateBeforeValid ||
			`Дата поверки должна идти раньше даты следующей поверки, либо быть равной ей (${dateOfTheNextVerification.format(
				dayjsFormatVariant
			)})`
		);
	};

	const dateOfTheNextVerificationBefore = (
		dateOfTheNextVerification: Dayjs,
		{ verificationDate }: FormType
	) => {
		const nextVerificationDateBeforeValid = !verificationDate.isAfter(dateOfTheNextVerification);
		return (
			nextVerificationDateBeforeValid ||
			`Дата следующей поверки должна идти после даты поверки, либо быть равной ей (${verificationDate.format(
				dayjsFormatVariant
			)})`
		);
	};

	const isBeforeCreateOfDateOfTheNextVerification = (nextVerification: Dayjs) => {
		const productionDateFromNextVerificationValid = !productionDate.isAfter(nextVerification);
		return (
			productionDateFromNextVerificationValid ||
			`Дата следующей поверки должна идти после даты производства, либо быть равной ей (${productionDate.format(
				dayjsFormatVariant
			)})`
		);
	};

	const isBeforeCreateOfVerificationDate = (verificationDate: Dayjs) => {
		const productionDateFromVerificationValid = !productionDate.isAfter(verificationDate);
		return (
			productionDateFromVerificationValid ||
			`Дата поверки должна идти позже даты производства, либо быть равной ей (${dayjs(
				productionDate
			).format(dayjsFormatVariant)})`
		);
	};

	const handleValidateDate = (date: Dayjs) => date.isValid() || 'Неверный формат даты';

	const requiredValidation = (bool?: boolean) => {
		return Boolean(!bool) || 'Обязательное поле';
	};

	const verificationDateValidate = {
		valid: handleValidateDate,
		isBefore: verificationDateBefore,
		isBeforeCreate: isBeforeCreateOfVerificationDate,
	};

	const dateOfTheNextVerificationValidate = {
		valid: handleValidateDate,
		isBefore: dateOfTheNextVerificationBefore,
		isBeforeCreate: isBeforeCreateOfDateOfTheNextVerification,
	};

	return {
		requiredValidation,
		verificationDateValidate,
		dateOfTheNextVerificationValidate,
	};
};
