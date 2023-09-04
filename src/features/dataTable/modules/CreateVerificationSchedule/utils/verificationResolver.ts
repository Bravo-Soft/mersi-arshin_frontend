import { zodResolver } from '@hookform/resolvers/zod';
import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';

const verificationSchema = z.object({
	fieldsDate: z
		.tuple([
			z.instanceof(dayjs as unknown as typeof Dayjs).nullable(),
			z.instanceof(dayjs as unknown as typeof Dayjs).nullable(),
		])
		.refine(([first, second]) => {
			return first && second && Boolean(first && second)
				? dayjs(second).isAfter(dayjs(first))
				: true;
		}, 'Дата поверки не может идти после даты следующей поверки'),
	filters: z.object({
		columnField: z.string(),
		operatorValue: z.string(),
		value: z.string(),
		id: z.number(),
	}),
});

export const verificationResolver = zodResolver(verificationSchema);
