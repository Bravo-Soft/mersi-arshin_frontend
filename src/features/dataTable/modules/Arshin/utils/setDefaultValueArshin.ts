/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from 'dayjs';

import { Tag } from 'constant/tag';
import type { IDataItem } from 'types/dataItem';

export const setDefaultValueArshin = (data?: IDataItem | null) => {
	if (data) {
		const {
			name,
			type,
			factoryNumber,
			organization,
			certificate,
			suitability,
			verificationDate,
			dateOfTheNextVerification,
			...other
		} = data;

		return {
			...other,
			name,
			type,
			factoryNumber,
			organization,
			certificate,
			suitability: suitability.toString(),
			verificationDate: dayjs(verificationDate),
			dateOfTheNextVerification: dayjs(dateOfTheNextVerification),
		};
	}
};
