import { zodResolver } from '@hookform/resolvers/zod';
import { compareAsc, format } from 'date-fns';
import { z } from 'zod';

import { Tag } from '../../constant/tag';
import { createDateISO } from '../../utils/createDateISO';

import { formatVariant } from 'constant/dateFormat';

const iDocumentSchema = z.object({
	id: z.string(),
	label: z.string(),
	size: z.number(),
});

export const dataItemSchema = z
	.object({
		name: z.string().max(256, 'Длинна строки не может быть больше 256'),
		type: z.string().max(128, 'Длинна строки не может быть больше 128'),
		factoryNumber: z.string().max(128, 'Длинна строки не может быть больше 128'),
		inventoryNumber: z.string().max(128, 'Длинна строки не может быть больше 128'),
		division: z.string().max(128, 'Длинна строки не может быть больше 128'),
		verificationDate: z.date(),
		dateOfTheNextVerification: z.date(),
		typeOfWork: z.string().max(128, 'Длинна строки не может быть больше 128'),
		condition: z.string().max(256, 'Длинна строки не может быть больше 256'),
		stateRegister: z.string().max(256, 'Длинна строки не может быть больше 256'),
		certificate: z.string().max(256, 'Длинна строки не может быть больше 256'),
		productionDate: z.date(),
		organization: z.string().max(256, 'Длинна строки не может быть больше 256'),
		accuracyClass: z.string().max(256, 'Длинна строки не может быть больше 256'),
		measurementLimit: z.string().max(128, 'Длинна строки не может быть больше 128'),
		size: z.nativeEnum(Tag),
		notes: z.string().max(256, 'Длинна строки не может быть больше 256'),
		documents: z.array(iDocumentSchema),
		// userIds: z.array(z.string()),
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
	})
	.superRefine(({ dateOfTheNextVerification, verificationDate, productionDate }, ctx) => {
		if (compareAsc(productionDate, verificationDate) !== -1) {
			ctx.addIssue({
				code: 'custom',
				message: `Дата производства должна идти раньше или быть равной дате поверки (${format(
					verificationDate,
					formatVariant
				)})`,
				path: ['productionDate'],
			});
		}
		if (compareAsc(productionDate, dateOfTheNextVerification) !== -1) {
			ctx.addIssue({
				code: 'custom',
				message: `Дата производства должна идти раньше даты следующей поверки, либо быть равной ей (${format(
					dateOfTheNextVerification,
					formatVariant
				)})`,
				path: ['productionDate'],
			});
		}

		if (compareAsc(productionDate, verificationDate) !== -1) {
			ctx.addIssue({
				code: 'custom',
				message: `Дата поверки должна идти позже даты производства, либо быть равной ей (${format(
					productionDate,
					formatVariant
				)})`,
				path: ['verificationDate'],
			});
		}

		if (compareAsc(verificationDate, dateOfTheNextVerification) !== 1) {
			ctx.addIssue({
				code: 'custom',
				message: `Дата поверки должна идти раньше даты следующей поверки, либо быть равной ей (${format(
					dateOfTheNextVerification,
					formatVariant
				)})`,
				path: ['verificationDate'],
			});
		}
		if (compareAsc(dateOfTheNextVerification, productionDate) !== -1) {
			ctx.addIssue({
				code: 'custom',
				message: `Дата следующей поверки должна идти после даты производства, либо быть равной ей (${format(
					productionDate,
					formatVariant
				)})`,
				path: ['dateOfTheNextVerification'],
			});
		}
		if (compareAsc(dateOfTheNextVerification, verificationDate) !== -1) {
			ctx.addIssue({
				code: 'custom',
				message: `Дата следующей поверки должна идти после даты поверки, либо быть равной ей (${format(
					verificationDate,
					formatVariant
				)})`,
				path: ['dateOfTheNextVerification'],
			});
		}
	});

export const transformDataItemSchema = z.object({
	dateOfTheNextVerification: z.date().transform(e => createDateISO(e)),
	verificationDate: z.date().transform(e => createDateISO(e)),
	productionDate: z.date().transform(e => createDateISO(e)),
});

export const dateItemSchema = dataItemSchema.innerType().merge(transformDataItemSchema);

export const formResolver = zodResolver(dataItemSchema);
