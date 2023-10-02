import { useCancelArshinMutation, useStartArshinMutation } from '../arshinTableApiSlice';
import { selectSelectedArshin } from '../arshinTableSlice';

import { useAppSelector } from 'hooks/redux';

export const useSendingArshin = () => {
	const [arshinStart] = useStartArshinMutation();
	const [arshinCancel] = useCancelArshinMutation();

	//Массив id позиций (модель + выбранная позиция вне модели)
	const selectedDataIds = useAppSelector(selectSelectedArshin);

	const handleStart = async () => await arshinStart(selectedDataIds).unwrap();
	const handleCancel = async () => await arshinCancel().unwrap();

	return { handleStart, handleCancel };
};
