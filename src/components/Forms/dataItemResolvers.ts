import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Tag } from '../../constant/tag';
import { createDateISO } from '../../utils/createDateISO';

const dataItemSchema = z.object({
	name: z.string(),
	type: z.string(),
	factoryNumber: z.string(),
	inventoryNumber: z.string(),
	division: z.string(),
	verificationDate: z
		.date()
		.transform(str => createDateISO(str))
		.pipe(z.coerce.string()),
	dateOfTheNextVerification: z
		.date()
		.transform(str => createDateISO(str))
		.pipe(z.coerce.string()),
	typeOfWork: z.string(),
	condition: z.string(),
	stateRegister: z.string(),
	certificate: z.string(),
	productionDate: z
		.date()
		.transform(str => createDateISO(str))
		.pipe(z.coerce.string()),
	organization: z.string(),
	accuracyClass: z.string(),
	measurementLimit: z.string(),
	size: z.nativeEnum(Tag),
	notes: z.string(),
	// documents: IDocument[];
	userIds: z.array(z.string()),
	interVerificationInterval: z.string(),
});

// 	productionDate: createDateISO(productionDate),
// 	verificationDate: createDateISO(verificationDate),
// 	dateOfTheNextVerification: createDateISO(dateOfTheNextVerification),
export const verificationDataItemSchema = dataItemSchema.pick({
	verificationDate: true,
	interVerificationInterval: true,
	dateOfTheNextVerification: true,
	typeOfWork: true,
	stateRegister: true,
	certificate: true,
	organization: true,
});
export const verificationResolver = zodResolver(dataItemSchema);
