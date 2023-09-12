import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const templateSchema = z.object({
	templateName: z.string().min(1, 'Имя не может быть пустым'),
});

export const templateResolver = zodResolver(templateSchema);
