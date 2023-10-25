import dayjs from 'dayjs';

import { Tag } from 'constant/tag';
import type { IDataItem } from 'types/dataItem';

export const setDefaultValue = (data?: IDataItem | null) => {
	if (data) {
		return {
			...data,
			suitability: data.suitability.toString(),
			productionDate: dayjs(data.productionDate),
			verificationDate: dayjs(data.verificationDate),
			dateOfTheNextVerification: dayjs(data.dateOfTheNextVerification),
			size: Tag.SMALL,
		};
	}
};
