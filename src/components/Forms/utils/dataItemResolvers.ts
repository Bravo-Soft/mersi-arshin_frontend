import { zodResolver } from '@hookform/resolvers/zod';
import { compareAsc, format } from 'date-fns';
import { z } from 'zod';

import { largeLengthField, smallLengthField } from './errorMessage';

import { formatVariant } from 'constant/dateFormat';
import { Tag } from 'constant/tag';

const minDate = new Date('01-01-1950');
const maxDate = new Date('01-01-2070');
const minDateMessage = 'Дата должна быть не раньше  чем 01.01.1950';
const maxDateMessage = 'Дата не должна быть позже чем 01.01.2070';

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
			.date({ required_error: 'Это обязательное поле' })
			.min(minDate, minDateMessage)
			.max(maxDate, maxDateMessage),
		dateOfTheNextVerification: z
			.date({ required_error: 'Это обязательное поле' })
			.min(minDate, minDateMessage)
			.max(maxDate, maxDateMessage),
		productionDate: z
			.date({ required_error: 'Это обязательное поле' })
			.min(minDate, minDateMessage)
			.max(maxDate, maxDateMessage),
	})
	.superRefine(({ dateOfTheNextVerification, verificationDate, productionDate }, ctx) => {
		if (compareAsc(productionDate, verificationDate) === 1) {
			ctx.addIssue({
				code: 'invalid_date',
				message: `Дата производства должна идти раньше или быть равной дате поверки (${format(
					verificationDate,
					formatVariant
				)})`,
				path: ['productionDate'],
			});
			ctx.addIssue({
				code: 'invalid_date',
				message: `Дата поверки должна идти позже даты производства, либо быть равной ей (${format(
					productionDate,
					formatVariant
				)})`,
				path: ['verificationDate'],
			});
		}
		if (compareAsc(productionDate, dateOfTheNextVerification) === 1) {
			ctx.addIssue({
				code: 'invalid_date',
				message: `Дата производства должна идти раньше даты следующей поверки, либо быть равной ей (${format(
					dateOfTheNextVerification,
					formatVariant
				)})`,
				path: ['productionDate'],
			});
			ctx.addIssue({
				code: 'invalid_date',
				message: `Дата следующей поверки должна идти после даты производства, либо быть равной ей (${format(
					productionDate,
					formatVariant
				)})`,
				path: ['dateOfTheNextVerification'],
			});
		}

		if (compareAsc(verificationDate, dateOfTheNextVerification) === 1) {
			ctx.addIssue({
				code: 'invalid_date',
				message: `Дата поверки должна идти раньше даты следующей поверки, либо быть равной ей (${format(
					dateOfTheNextVerification,
					formatVariant
				)})`,
				path: ['verificationDate'],
			});
			ctx.addIssue({
				code: 'invalid_date',
				message: `Дата следующей поверки должна идти после даты поверки, либо быть равной ей (${format(
					verificationDate,
					formatVariant
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
	.and(dateSchema);

export const formResolver = zodResolver(schema);
export const createResolver = zodResolver(createSchema);
