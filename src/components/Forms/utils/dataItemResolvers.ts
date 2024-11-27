import { zodResolver } from '@hookform/resolvers/zod';
import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';

import {
	maxDateConstant,
	maxDateMessageConstant,
	minDateConstant,
	minDateMessageConstant,
} from './dateConstants';
import {
	biggerLengthField,
	largeLengthField,
	mediumLengthField,
	smallLengthField,
} from './errorMessage';

import { dayjsFormatVariant } from 'constant/dateFormat';
import { Tag } from 'constant/tag';

export const itemSchema = z.object({
	name: z.string().max(512, mediumLengthField).min(1, 'Это обязательное поле'),
	type: z.string().max(128, smallLengthField),
	view: z.string().max(128, smallLengthField),
	factoryNumber: z.string().max(128, smallLengthField),
	inventoryNumber: z.string().max(128, smallLengthField),
	division: z.string().max(128, smallLengthField),
	typeOfWork: z.string().max(128, smallLengthField),
	condition: z.string().max(256, largeLengthField),
	stateRegister: z.string().max(256, largeLengthField),
	certificate: z.string().max(256, largeLengthField),
	organization: z.string().max(256, largeLengthField),
	accuracyClass: z.string().max(256, largeLengthField),
	measurementLimit: z.string().max(128, smallLengthField),
	location: z.string().max(512, mediumLengthField),
	responsible: z.string().max(128, smallLengthField),
	suitability: z.string(),
	fgisUrl: z.string().max(256, largeLengthField),
	additionalData: z.string().max(1024, biggerLengthField),
	methodology: z.string().max(256, largeLengthField),
	cost: z
		.string()
		.regex(new RegExp(/^-?[0-9]\d*(\.\d+)?$/), 'Округлите до сотых')
		.transform(e => Number(e))
		.refine(e => e >= 0, 'Минимальное допустимое число 1')
		.transform(e => e.toString()),
	size: z.nativeEnum(Tag),
	notes: z.string().max(1024, biggerLengthField),
	interVerificationInterval: z
		.number()
		.positive('Число не может быть менее 0')
		.lte(9999, 'Число не может быть больше чем 9999'),
	verificationControlInStateRegister: z.boolean(),
	id: z.string(),
	comment: z.string(),
});

const dateSchema = z
	.object({
		verificationDate: z
			.instanceof(dayjs as unknown as typeof Dayjs, { message: 'Неверный формат даты' })
			.refine(e => e.isValid(), 'Неверный формат даты')
			.transform(e => new Date(e.format()))
			.pipe(
				z
					.date({
						required_error: 'Это обязательное поле',
					})
					.min(minDateConstant, minDateMessageConstant)
					.max(maxDateConstant, maxDateMessageConstant)
			),
		dateOfTheNextVerification: z
			.instanceof(dayjs as unknown as typeof Dayjs, { message: 'Неверный формат даты' })
			.refine(e => e.isValid(), 'Неверный формат даты')
			.transform(e => new Date(e.format()))
			.pipe(
				z
					.date({
						required_error: 'Это обязательное поле',
					})
					.min(minDateConstant, minDateMessageConstant)
					.max(maxDateConstant, maxDateMessageConstant)
			),
		productionDate: z
			.instanceof(dayjs as unknown as typeof Dayjs, { message: 'Неверный формат даты' })
			.refine(e => e.isValid(), 'Неверный формат даты')
			.transform(e => new Date(e.format()))
			.pipe(
				z
					.date({
						required_error: 'Это обязательное поле',
					})
					.min(minDateConstant, minDateMessageConstant)
					.max(maxDateConstant, maxDateMessageConstant)
			),
	})

	.superRefine(({ dateOfTheNextVerification, verificationDate, productionDate }, ctx) => {
		const productionDateObj = dayjs(productionDate);
		const verificationDateObj = dayjs(verificationDate);
		const dateOfTheNextVerificationObj = dayjs(dateOfTheNextVerification);

		const isProductionDateValid =
			productionDateObj.isSame(verificationDateObj) ||
			productionDateObj.isBefore(verificationDateObj);

		const isVerificationDateValid =
			verificationDateObj.isSame(dateOfTheNextVerificationObj) ||
			verificationDateObj.isBefore(dateOfTheNextVerificationObj);

		const isDateOfTheNextVerificationValid =
			dateOfTheNextVerificationObj.isSame(verificationDateObj) ||
			dateOfTheNextVerificationObj.isAfter(verificationDateObj);

		if (!isProductionDateValid) {
			ctx.addIssue({
				code: 'invalid_date',
				message: `Дата производства должна идти раньше или быть равной дате поверки (${verificationDateObj.format(
					dayjsFormatVariant
				)})`,
				path: ['productionDate'],
			});
		}

		if (!isVerificationDateValid) {
			ctx.addIssue({
				code: 'invalid_date',
				message: `Дата поверки должна идти позже даты производства, либо быть равной ей (${productionDateObj.format(
					dayjsFormatVariant
				)})`,
				path: ['verificationDate'],
			});
		}

		if (!isDateOfTheNextVerificationValid) {
			ctx.addIssue({
				code: 'invalid_date',
				message: `Дата следующей поверки должна идти после даты поверки, либо быть равной ей (${verificationDateObj.format(
					dayjsFormatVariant
				)})`,
				path: ['dateOfTheNextVerification'],
			});
		}
	});

export const schema = itemSchema.and(dateSchema);

export const createSchema = itemSchema
	.omit({
		id: true,
	})
	.and(z.object({ verificationControlInStateRegister: z.boolean() }))
	.and(dateSchema);

export const formResolver = zodResolver(schema);
export const createResolver = zodResolver(createSchema);
export const dateResolver = zodResolver(dateSchema);
