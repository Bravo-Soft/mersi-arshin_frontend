import { zodResolver } from '@hookform/resolvers/zod';
import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';

import {
	maxDateConstant,
	maxDateMessageConstant,
	minDateConstant,
	minDateMessageConstant,
} from 'components/Forms/utils/dateConstants';
import { Tag } from 'constant/tag';

const verificationSchema = z.object({
	fieldsDate: z
		.tuple([
			z
				.instanceof(dayjs as unknown as typeof Dayjs, { message: 'Неверный формат даты' })
				.refine(e => e.isValid(), 'Неверный формат даты')
				.transform(e => new Date(e.format()))
				.pipe(
					z
						.date()
						.min(minDateConstant, minDateMessageConstant)
						.max(maxDateConstant, maxDateMessageConstant)
				)
				.nullable(),
			z
				.instanceof(dayjs as unknown as typeof Dayjs, { message: 'Неверный формат даты' })
				.refine(e => e.isValid(), 'Неверный формат даты')
				.transform(e => new Date(e.format()))
				.pipe(
					z
						.date()
						.min(minDateConstant, minDateMessageConstant)
						.max(maxDateConstant, maxDateMessageConstant)
				)
				.nullable(),
		])
		.refine(([first, second]) => {
			return first &&
				second &&
				dayjs(first).isValid() &&
				dayjs(second).isValid() &&
				Boolean(first && second)
				? dayjs(second).isAfter(dayjs(first))
				: true;
		}, 'Дата поверки не может идти после даты следующей поверки'),
	filters: z.array(
		z.object({
			columnField: z.string(),
			operatorValue: z.string(),
			value: z
				.string()
				.or(z.nativeEnum(Tag))
				.or(
					z
						.instanceof(dayjs as unknown as typeof Dayjs, { message: 'Неверный формат даты' })
						.refine(e => e.isValid(), 'Неверный формат даты')
						.transform(e => new Date(e.format()))
						.pipe(
							z
								.date()
								.min(minDateConstant, minDateMessageConstant)
								.max(maxDateConstant, maxDateMessageConstant)
						)
				),
			id: z.number(),
		})
	),
});

export const verificationResolver = zodResolver(verificationSchema);
