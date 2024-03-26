import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const errorMessage = 'Число должно быть > 0';

const printSettingsSchema = z.object({
	'large-font': z.number().positive(errorMessage),
	'large-height': z.number().positive(errorMessage),
	'large-width': z.number().positive(errorMessage),
	'medium-font': z.number().positive(errorMessage),
	'medium-height': z.number().positive(errorMessage),
	'medium-width': z.number().positive(errorMessage),
	'small-font': z.number().positive(errorMessage),
	'small-height': z.number().positive(errorMessage),
	'small-width': z.number().positive(errorMessage),
});

export const printSettingsResolver = zodResolver(printSettingsSchema);
