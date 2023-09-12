import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const authSchema = z.object({
	email: z
		.string()
		.transform(e => e.trim())
		.pipe(z.string().email('Введите email в верном формате').min(1, 'Введите почту')),
	password: z
		.string()
		.min(8, 'Минимальная длина пароля 8 символов')
		.regex(new RegExp(/s/, 'g'), 'loshpeta'),
	// .regex(new RegExp('/[^A-Za-z0-9]/'), 'Пароль не соответствует правилам безопасности'),
});

export const authResolver = zodResolver(authSchema);
