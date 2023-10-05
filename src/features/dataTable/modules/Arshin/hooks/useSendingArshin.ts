import { useCancelArshinMutation, useStartArshinMutation } from '../arshinTableApiSlice';
import { selectSelectedArshin } from '../arshinTableSlice';
import { resetState, setStartProcess } from '../eventSourceSlice';

import { useAppDispatch, useAppSelector } from 'hooks/redux';

export const useSendingArshin = () => {
	const [arshinStart] = useStartArshinMutation();
	const [arshinCancel] = useCancelArshinMutation();
	const dispatch = useAppDispatch();
	//Массив id позиций (модель + выбранная позиция вне модели)
	const selectedDataIds = useAppSelector(selectSelectedArshin);

	const handleStart = async () => {
		try {
			await arshinStart(selectedDataIds).unwrap();
			dispatch(setStartProcess(true));
		} catch {
			setStartProcess(false);
		}
	};
	const handleCancel = async () => {
		await arshinCancel().unwrap();
		localStorage.setItem('total', '0');
		localStorage.setItem('processed', '0');
		dispatch(setStartProcess(false));
		dispatch(resetState());
	};

	return { handleStart, handleCancel };
};
