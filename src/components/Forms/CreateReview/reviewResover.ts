import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const reviewSchema = z.object({
	rating: z.number(),
	message: z.string(),
});

export const reviewResolver = zodResolver(reviewSchema);
