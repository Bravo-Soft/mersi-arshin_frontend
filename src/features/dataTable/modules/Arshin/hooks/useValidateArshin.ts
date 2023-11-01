import dayjs, { Dayjs } from 'dayjs';
import { Validate, useFormContext } from 'react-hook-form';

import { dayjsFormatVariant } from 'constant/dateFormat';
import { IDataItemWithDates } from 'types/dataItem';

type FormType = Omit<IDataItemWithDates, 'document' | 'userIds'>;

export const useValidateArshin = () => {
	const { watch } = useFormContext<Omit<IDataItemWithDates, 'documents' | 'userIds'>>();

	const watches = watch();

	const { productionDate } = watches;

	const verificationDateBefore = (date: Dayjs, obj: FormType) =>
		!dayjs(obj.dateOfTheNextVerification).isBefore(dayjs(date)) ||
		`Дата поверки должна идти раньше даты следующей поверки, либо быть равной ей (${dayjs(
			obj.dateOfTheNextVerification
		).format(dayjsFormatVariant)})`;

	const dateOfTheNextVerificationBefore = (date: Dayjs, obj: FormType) =>
		!dayjs(date).isBefore(dayjs(obj.verificationDate)) ||
		`Дата следующей поверки должна идти после даты поверки, либо быть равной ей (${dayjs(
			obj.verificationDate
		).format(dayjsFormatVariant)})`;

	const isBeforeCreateOfDateOfTheNextVerification = (date: Dayjs) =>
		dayjs(date).isAfter(dayjs(productionDate)) ||
		`Дата следующей поверки должна идти после даты производства, либо быть равной ей (${dayjs(
			productionDate
		).format(dayjsFormatVariant)})`;

	const isBeforeCreateOfVerificationDate = (date: Dayjs) =>
		dayjs(date).isAfter(dayjs(productionDate)) ||
		`Дата поверки должна идти позже даты производства, либо быть равной ей (${dayjs(
			productionDate
		).format(dayjsFormatVariant)})`;

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
