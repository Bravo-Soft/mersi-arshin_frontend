import { zodResolver } from '@hookform/resolvers/zod';
import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';

import {
	maxDateConstant,
	maxDateMessageConstant,
	minDateConstant,
	minDateMessageConstant,
} from '../utils/dateConstants';

import { DATE_OF_SENDING_NOTIFICATION, RANGE_OF_SELECTION } from 'constant/mailer';
import { Tag } from 'constant/tag';

const notificationSchema = z.object({
	isNotificationEnabled: z.boolean(),
	dateOfSendingNotification: z.nativeEnum(DATE_OF_SENDING_NOTIFICATION),
	rangeOfSelection: z.nativeEnum(RANGE_OF_SELECTION),
	subscribedEmails: z
		.array(
			z.object({
				email: z.string().email('Введите email в верном формате').min(0, 'Введите адрес почты'),
				emailFilters: z.array(
					z.object({
						columnFilter: z.string(),
						operatorValue: z.string(),

						value: z
							.string()
							.or(z.nativeEnum(Tag))
							.or(
								z
									.instanceof(dayjs as unknown as typeof Dayjs, {
										message: 'Неверный формат даты',
									})
									.refine(e => e.isValid(), 'Неверный формат даты')
									.transform(e => new Date(e.format()))
									.pipe(
										z
											.date()
											.min(minDateConstant, minDateMessageConstant)
											.max(maxDateConstant, maxDateMessageConstant)
									)
							),
					})
				),
				linkOperator: z.enum(['or', 'and']),
			})
		)
		.superRefine((e, ctx) => {
			const emailArray = e.reduce<Record<string, string[]>>((acc, { email }, index) => {
				const emailNotification = `${index}.email`;
				return acc[email]
					? { ...acc, [email]: [...acc[email], emailNotification] }
					: { ...acc, [email]: [emailNotification] };
			}, {});
			Object.entries(emailArray).forEach(([key, value]) => {
				if (value.length > 1) {
					value.forEach(element => {
						ctx.addIssue({
							code: 'custom',
							message: `Введите уникальный email не равный ${key}`,
							path: [`${element}`],
						});
					});
				}
			});
		}),
});

export const notificationResolver = zodResolver(notificationSchema);
