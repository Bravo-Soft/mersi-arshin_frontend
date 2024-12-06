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

	const verifications = [
		{
			verificationDate: '2024-07-08T21:00:00.000Z',
			workType: 'Поверка',
			document: '111111',
			organization: 'ООО "ФНИИМ"',
			resolution: 'Годен',
			fio: 'Иванов И.И.',
		},
		{
			verificationDate: '2024-07-08T21:00:00.000Z',
			workType: 'Доверка',
			document: '39у38',
			organization: 'ООО "Ктопришел"',
			resolution: 'Годен',
			fio: 'Иванов И.И.',
		},
		{
			verificationDate: '2024-07-08T21:00:00.000Z',
			workType: 'Переверка',
			document: '11113111',
			organization: 'ООО "ААА"',
			resolution: 'Годен',
			fio: 'Иванов И.И.',
		},
	];

	const { data: historyData = [], isFetching } = useGetHistoryDataByIdQuery(
		selectedItem?.id as string,
		{ skip: !selectedItem }
	);

	const getVerificationsAndRepairs = () => {
		const data = historyData
			.filter(el => el.flags.includes('condition') && el.condition !== 'В работе')
			.map(({ editedBy, modificationDate, conditionDescription }) => ({
				editedBy,
				modificationDate,
				conditionDescription,
			}));
		return { repairs: data };
	};
	const { repairs } = getVerificationsAndRepairs();

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
