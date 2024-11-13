import dayjs from 'dayjs';

import { type ISummary } from '../types';

import { selectSelectedDataItem } from 'features/dataTable/dataTableSlice';
import { useAppSelector } from 'hooks/redux';
import { type IDataItem } from 'types/dataItem';

export const useGetPassportData = () => {
	const organization = '  ___________________________________________________________';

	const selectedItem = useAppSelector(selectSelectedDataItem);

	//Вид работ из столбцов - в вид метрологических работ
	//Межповерочный интервал в столбцах - периодичсноть

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
	} = selectedItem as IDataItem;

	const summaryData: ISummary = {
		passportId: '__________',
		name,
		productionDate: dayjs(productionDate).format('DD.MM.YYYY') || '',
		inventoryNumber,
		type,
		factoryNumber,
		accuracyClass,
		startDate: dayjs(productionDate).format('DD.MM.YYYY'),
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

	const repairs = [
		{
			repareDate: '2024-07-08T21:00:00.000Z',
			repairType: 'Ремонт корпуса',
			fio: 'Иванов И.И.',
		},
		{
			repareDate: '2024-07-08T21:00:00.000Z',
			repairType: 'Ремонт корпуса',
			fio: 'Иванов И.И.',
		},
		{
			repareDate: '2024-07-08T21:00:00.000Z',
			repairType: 'Ремонт корпуса',
			fio: 'Иванов И.И.',
		},
	];

	return { division: [division], organization, summaryData, verifications, repairs };
};
