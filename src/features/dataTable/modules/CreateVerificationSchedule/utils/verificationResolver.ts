import { zodResolver } from '@hookform/resolvers/zod';
import { compareAsc } from 'date-fns';
import { z } from 'zod';

const verificationSchema = z.object({
	fieldsDate: z.tuple([z.date().nullable(), z.date().nullable()]).refine(([first, second]) => {
		return first && second && Boolean(first && second) ? compareAsc(second, first) !== -1 : true;
	}, 'Дата поверки не может идти после Даты следуйщей поверки'),
	filters: z.object({
		columnField: z.string(),
		operatorValue: z.string(),
		value: z.string(),
		id: z.number(),
	}),
});

export const verificationResolver = zodResolver(verificationSchema);
