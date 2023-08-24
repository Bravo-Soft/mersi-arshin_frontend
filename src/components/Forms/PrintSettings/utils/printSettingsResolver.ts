import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const printSettingsSchema = z.object({
	'large-font': z.number().nonnegative('Число должно быть >= 0'),
	'large-height': z.number().nonnegative('Число должно быть >= 0'),
	'large-width': z.number().nonnegative('Число должно быть >= 0'),
	'medium-font': z.number().nonnegative('Число должно быть >= 0'),
	'medium-height': z.number().nonnegative('Число должно быть >= 0'),
	'medium-width': z.number().nonnegative('Число должно быть >= 0'),
	'small-font': z.number().nonnegative('Число должно быть >= 0'),
	'small-height': z.number().nonnegative('Число должно быть >= 0'),
	'small-width': z.number().nonnegative('Число должно быть >= 0'),
});

export const printSettingsResolver = zodResolver(printSettingsSchema);
