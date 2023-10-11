import { zodResolver } from '@hookform/resolvers/zod';
import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';

import {
	maxDateConstant,
	maxDateMessageConstant,
	minDateConstant,
	minDateMessageConstant,
} from './dateConstants';
import { largeLengthField, smallLengthField } from './errorMessage';

import { dayjsFormatVariant } from 'constant/dateFormat';
import { Tag } from 'constant/tag';

export const itemSchema = z.object({
	name: z.string().max(256, largeLengthField).min(1, 'Это обязательное поле'),
	type: z.string().max(128, smallLengthField),
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
	location: z.string().max(128, smallLengthField),
	responsible: z.string().max(128, smallLengthField),
	suitability: z.boolean(),
	fgisUrl: z.string().max(256, largeLengthField),
	additionalData: z.string().max(256, largeLengthField),
	methodology: z.string().max(256, largeLengthField),
	cost: z
		.string()
		.regex(new RegExp(/^-?[0-9]\d*(\.\d+)?$/), 'Округлите до сотых')
		.transform(e => Math.floor(Number(e)))
		.refine(e => e >= 0, 'Минимальное допустимое число 1'),
	size: z.nativeEnum(Tag),
	notes: z.string().max(256, largeLengthField),
	interVerificationInterval: z
		.string()
		.transform(e => Number(e))
		.pipe(
			z
				.number()
				.gte(0, 'Число не может быть менее 0')
				.lte(9999, 'Число не может быть больше чем 9999')
		)
		.transform(e => String(e)),

	id: z.string(),
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
		if (dayjs(productionDate).isAfter(dayjs(verificationDate))) {
			ctx.addIssue({
				code: 'invalid_date',
				message: `Дата производства должна идти раньше или быть равной дате поверки (${dayjs(
					verificationDate
				).format(dayjsFormatVariant)})`,
				path: ['productionDate'],
			});
			ctx.addIssue({
				code: 'invalid_date',
				message: `Дата поверки должна идти позже даты производства, либо быть равной ей (${dayjs(
					productionDate
				).format(dayjsFormatVariant)})`,
				path: ['verificationDate'],
			});
		}
		if (dayjs(productionDate).isAfter(dayjs(dateOfTheNextVerification))) {
			ctx.addIssue({
				code: 'invalid_date',
				message: `Дата производства должна идти раньше даты следующей поверки, либо быть равной ей (${dayjs(
					dateOfTheNextVerification
				).format(dayjsFormatVariant)})`,
				path: ['productionDate'],
			});
			ctx.addIssue({
				code: 'invalid_date',
				message: `Дата следующей поверки должна идти после даты производства, либо быть равной ей (${dayjs(
					productionDate
				).format(dayjsFormatVariant)})`,
				path: ['dateOfTheNextVerification'],
			});
		}

		if (dayjs(verificationDate).isAfter(dayjs(dateOfTheNextVerification))) {
			ctx.addIssue({
				code: 'invalid_date',
				message: `Дата поверки должна идти раньше даты следующей поверки, либо быть равной ей (${dayjs(
					dateOfTheNextVerification
				).format(dayjsFormatVariant)})`,
				path: ['verificationDate'],
			});
			ctx.addIssue({
				code: 'invalid_date',
				message: `Дата следующей поверки должна идти после даты поверки, либо быть равной ей (${dayjs(
					verificationDate
				).format(dayjsFormatVariant)})`,
				path: ['dateOfTheNextVerification'],
			});
		}
	});

export const schema = itemSchema.and(dateSchema);

export const createSchema = itemSchema
	.omit({
		id: true,
	})
	.and(dateSchema);

export const formResolver = zodResolver(schema);
export const createResolver = zodResolver(createSchema);
