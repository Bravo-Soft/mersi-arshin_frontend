import { parseISO } from 'date-fns';

import { Tag } from 'constant/tag';
import type { IDataItem } from 'types/dataItem';

export const setDefaultValue = (data: IDataItem | null) => {
	if (data) {
		return {
			...data,
			productionDate: parseISO(data.productionDate),
			verificationDate: parseISO(data.verificationDate),
			dateOfTheNextVerification: parseISO(data.dateOfTheNextVerification),
			size: Tag.SMALL,
		};
	}
};
