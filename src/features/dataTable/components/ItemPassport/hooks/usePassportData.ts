import dayjs from 'dayjs';
import { useEffect } from 'react';

import { type ISummary } from '../types';

import { dayjsFormatVariant } from 'constant/dateFormat';
import {
	resetPassportItem,
	selectSelectedDataItem,
	setPassportItem,
} from 'features/dataTable/dataTableSlice';
import { useGetHistoryDataByIdQuery } from 'features/historyTable/historyTableApiSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IDataItem } from 'types/dataItem';

export const usePassportData = () => {
	const dispatch = useAppDispatch();
	const selectedItem = useAppSelector(selectSelectedDataItem);

	const organization = '_______________________________________';

	const {
		name,
		productionDate,
		inventoryNumber,
		type,
		factoryNumber,
		accuracyClass,
		division,
		measurementLimit,
		typeOfWork,
		interVerificationInterval,
	} = (selectedItem as IDataItem) || {};

	const summaryData: ISummary = {
		passportId: '__________',
		name,
		productionDate: dayjs(productionDate).format(dayjsFormatVariant) || '',
		inventoryNumber,
		type,
		factoryNumber,
		accuracyClass,
		startDate: dayjs(productionDate).format(dayjsFormatVariant) || '',
		measurementLimit,
		typeOfWork,
		interVerificationInterval,
	};

	const { data: historyData = [], isFetching } = useGetHistoryDataByIdQuery(
		selectedItem?.id as string,
		{ skip: !selectedItem }
	);

	const getVerificationsAndRepairs = () => {
		const repairs = historyData
			.filter(el => el.flags.includes('condition') && el.condition !== 'В работе')
			.map(({ editedBy, modificationDate, conditionDescription }) => ({
				editedBy,
				modificationDate,
				conditionDescription,
			}));

		const verifications = historyData
			.filter(el => el.typeUpdate === 'mr')
			.map(
				({
					verificationDate,
					typeOfWork,
					organization,
					certificate,
					editedBy,
					suitability,
				}) => ({
					verificationDate,
					typeOfWork,
					organization,
					certificate,
					editedBy,
					suitability,
				})
			);
		return { repairs, verifications };
	};
	const { repairs, verifications } = getVerificationsAndRepairs();

	useEffect(() => {
		if (historyData.length) {
			dispatch(
				setPassportItem({
					organization,
					division: [division],
					summaryData,
					verifications,
					repairs,
				})
			);
			return () => {
				dispatch(resetPassportItem());
			};
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [historyData]);

	return { organization, division: [division], summaryData, verifications, repairs, isFetching };
};
