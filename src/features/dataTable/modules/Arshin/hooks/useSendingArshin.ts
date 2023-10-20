import {
	useCancelArshinMutation,
	useStartArshinMutation,
	useValidateArshinMutation,
} from '../arshinTableApiSlice';
import { resetState, setStartProcess } from '../eventSourceSlice';

import { useAppDispatch } from 'hooks/redux';

export const useSendingArshin = () => {
	const [arshinStart] = useStartArshinMutation();
	const [arshinCancel] = useCancelArshinMutation();
	const [arshinValidate] = useValidateArshinMutation();
	const dispatch = useAppDispatch();

	const handleStart = async (data: string[]) => {
		try {
			await arshinValidate(data).unwrap();
			dispatch(setStartProcess(true));
			await arshinStart(data).unwrap();
		} catch (error) {
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
