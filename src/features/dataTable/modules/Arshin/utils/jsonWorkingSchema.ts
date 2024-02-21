import { z } from 'zod';

const workingSchema = z.object({
	working: z.string(),
});

type Configuration = z.infer<typeof workingSchema>;

export const createworkingJson = (content: string): Configuration => {
	return z
		.custom<string>(data => {
			try {
				JSON.parse(content);
			} catch (error) {
				return false;
			}
			return true;
		}, 'invalid json') // write whatever error you want here
		.transform(content => JSON.parse(content))
		.pipe(workingSchema)
		.parse(content);
};
