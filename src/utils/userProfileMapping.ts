import { z } from 'zod';

import { IProfile } from 'types/profile';

const userProfileMappingSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	patronymicName: z.string(),
	organization: z.string(),
	position: z.string(),
	division: z.string(),
	phone: z.string(),
});

export const userProfileMapping = (data: IProfile) => userProfileMappingSchema.parse(data);
