import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { DATE_OF_SENDING_NOTIFICATION, RANGE_OF_SELECTION } from 'constant/mailer';

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
						value: z.string().or(z.date()),
					})
					// .partial({
					// 	value: true,
					// })
				),
				linkOperator: z.string().refine(e => e === 'or' || 'and'),
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
