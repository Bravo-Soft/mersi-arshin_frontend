import dayjs, { Dayjs } from 'dayjs';
import { useFormContext } from 'react-hook-form';

import { dayjsFormatVariant } from 'constant/dateFormat';
import { IDataItemWithDates } from 'types/dataItem';

type FormType = Omit<IDataItemWithDates, 'userIds'>;

export const useValidateArshin = () => {
	const { watch } = useFormContext<Omit<IDataItemWithDates, 'userIds'>>();

	const watches = watch();

	const { productionDate, factoryNumber } = watches;

	const validateFactoryNumber = (factoryNumber: string) => {
		if (!factoryNumber || factoryNumber.trim() === '') {
			return 'Заводской номер не должен быть пустым';
		}
		const factoryNumberPattern = /^[A-Za-z0-9-]+$/;
		if (!factoryNumberPattern.test(factoryNumber)) {
			return 'Номер завода должен содержать только буквы, цифры и дефисы';
		}
		return true;
	};

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
		if (!verificationDate) return `Дата МР должна быть заполнена`;
		const nextVerificationDateBeforeValid = !verificationDate.isAfter(dateOfTheNextVerification);
		return (
			nextVerificationDateBeforeValid ||
			`Дата следующей поверки должна идти после даты поверки, либо быть равной ей (${verificationDate.format(
				dayjsFormatVariant
			)})`
		);
	};

	const isBeforeCreateOfDateOfTheNextVerification = (nextVerification: Dayjs) => {
		if (!productionDate) {
			return true;
		}
		const productionDateFromNextVerificationValid = !productionDate.isAfter(nextVerification);
		return (
			productionDateFromNextVerificationValid ||
			`Дата следующей поверки должна идти после даты производства, либо быть равной ей (${productionDate.format(
				dayjsFormatVariant
			)})`
		);
	};

	const isBeforeCreateOfVerificationDate = (verificationDate: Dayjs) => {
		if (!productionDate) {
			return true;
		}
		const productionDateFromVerificationValid = !productionDate.isAfter(verificationDate);
		return (
			productionDateFromVerificationValid ||
			`Дата поверки должна идти позже даты производства, либо быть равной ей (${dayjs(
				productionDate
			).format(dayjsFormatVariant)})`
		);
	};

	const handleValidateDate = (date: Dayjs) => {
		if (date) {
			return date.isValid();
		}
		return 'Неверный формат даты';
	};

	const requiredValidation = (bool?: boolean) => {
		return bool && 'Обязательное поле';
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

	const factoryNumberValidate = {
		valid: validateFactoryNumber,
	};

	return {
		requiredValidation,
		verificationDateValidate,
		dateOfTheNextVerificationValidate,
		factoryNumberValidate,
	};
};
