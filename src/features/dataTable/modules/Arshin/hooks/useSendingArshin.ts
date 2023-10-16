import {
	useCancelArshinMutation,
	useStartArshinMutation,
	useValidateArshinMutation,
} from '../arshinTableApiSlice';
import { selectSelectedArshin } from '../arshinTableSlice';
import { resetState, setStartProcess } from '../eventSourceSlice';

import { useAppDispatch, useAppSelector } from 'hooks/redux';

export const useSendingArshin = () => {
	const [arshinStart] = useStartArshinMutation();
	const [arshinCancel] = useCancelArshinMutation();
	const [arshinValidate, { error }] = useValidateArshinMutation();
	const dispatch = useAppDispatch();
	//Массив id позиций (модель + выбранная позиция вне модели)
	const selectedDataIds = useAppSelector(selectSelectedArshin);

	const handleStart = async () => {
		try {
			dispatch(setStartProcess(true));
			await arshinValidate(selectedDataIds).unwrap();
			// await arshinStart(selectedDataIds);
		} catch (error) {
			// console.log('error', error);
			// console.log('isError', isError);
			dispatch(setStartProcess(false));
		}
	};
	const handleCancel = async () => {
		await arshinCancel();
		localStorage.setItem('total', '0');
		localStorage.setItem('processed', '0');
		dispatch(resetState());
	};

	return { handleStart, handleCancel };
};

//
