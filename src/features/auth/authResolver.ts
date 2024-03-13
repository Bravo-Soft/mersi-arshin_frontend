import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const authSchema = z.object({
	email: z
		.string()
		.transform(e => e.trim().toLocaleLowerCase())
		.pipe(
			z
				.string()
				.min(1, 'Введите почту')
				.refine(value => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value), {
					message: 'Введите email в верном формате',
				})
		),
	password: z
		.string()
		.transform(e => e.trim())
		.pipe(z.string().min(8, 'Минимальная длина пароля 8 символов')),
});

export const authResolver = zodResolver(authSchema);
