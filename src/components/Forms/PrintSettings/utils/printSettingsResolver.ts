import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const errorMessage = 'Число должно быть >= 0';

const printSettingsSchema = z.object({
	'large-font': z.number().nonnegative(errorMessage),
	'large-height': z.number().nonnegative(errorMessage),
	'large-width': z.number().nonnegative(errorMessage),
	'medium-font': z.number().nonnegative(errorMessage),
	'medium-height': z.number().nonnegative(errorMessage),
	'medium-width': z.number().nonnegative(errorMessage),
	'small-font': z.number().nonnegative(errorMessage),
	'small-height': z.number().nonnegative(errorMessage),
	'small-width': z.number().nonnegative(errorMessage),
});

export const printSettingsResolver = zodResolver(printSettingsSchema);
