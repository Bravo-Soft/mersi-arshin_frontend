import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const templateSchema = z.object({
	templateName: z.string().min(1, 'имя должно содержать символы'),
});

export const templateResolver = zodResolver(templateSchema);
