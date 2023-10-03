import { useCancelArshinMutation, useStartArshinMutation } from '../arshinTableApiSlice';
import { selectSelectedArshin } from '../arshinTableSlice';
import { resetState } from '../eventSourceSlice';

import { useAppDispatch, useAppSelector } from 'hooks/redux';

export const useSendingArshin = () => {
	const [arshinStart] = useStartArshinMutation();
	const [arshinCancel] = useCancelArshinMutation();
	const dispatch = useAppDispatch();
	//Массив id позиций (модель + выбранная позиция вне модели)
	const selectedDataIds = useAppSelector(selectSelectedArshin);

	const handleStart = async () => await arshinStart(selectedDataIds).unwrap();
	const handleCancel = async () => {
		await arshinCancel().unwrap();
		localStorage.setItem('total', '0');
		localStorage.setItem('current', '0');
		dispatch(resetState());
	};

	return { handleStart, handleCancel };
};
