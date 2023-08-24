import { zodResolver } from '@hookform/resolvers/zod';
import { compareAsc } from 'date-fns';
import { z } from 'zod';

const verificationSchema = z.object({
	fieldsDate: z
		.tuple([z.date().nullable(), z.date().nullable()])
		.superRefine(([first, second], ctx) => {
			if (first && second && compareAsc(first, second) !== -1) {
				console.log('sss', `${first}___${second} __ nen`);
				ctx.addIssue({
					code: 'custom',
					message: `sssssss`,
					path: ['productionDate'],
				});
			}
		}),
	filters: z.object({
		columnField: z.string(),
		operatorValue: z.string(),
		value: z.string(),
		id: z.number(),
	}),
});

export const verificationResolver = zodResolver(verificationSchema);
