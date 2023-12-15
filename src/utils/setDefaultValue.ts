/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from 'dayjs';

import { Tag } from 'constant/tag';
import type { IDataItem } from 'types/dataItem';

export const setDefaultValue = (data?: IDataItem | null) => {
	if (data) {
		const {
			suitability,
			productionDate,
			verificationDate,
			dateOfTheNextVerification,
			interVerificationInterval,
			userIds,
			...other
		} = data;

		return {
			...other,
			interVerificationInterval: Number(interVerificationInterval),
			suitability: suitability.toString(),
			productionDate: dayjs(productionDate),
			verificationDate: dayjs(verificationDate),
			dateOfTheNextVerification: dayjs(dateOfTheNextVerification),
			size: Tag.SMALL,
		};
	}
};
