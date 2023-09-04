import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

const userSchema = z.object({
	email: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	patronymicName: z.string(),
	organization: z.string(),
	position: z.string(),
	division: z.string(),
	phone: z.string(),
});

export const userResolver = zodResolver(userSchema);
