import { useCancelArshinMutation, useStartArshinMutation, useValidateArshinMutation } from '../arshinTableApiSlice';
import { resetState } from '../eventSourceSlice';

import { useAppDispatch } from 'hooks/redux';

/**
 * @package хук отправления данных на проверку в Arshin
 * @function handleStart => функция отправляет выбранную модель id на валидацию , в случае успеха данные пойдут на отправку
 * @function handleCancel => функция отмены проверки позиции
 * @returns возвращает  { handleStart, handleCancel }
 */

export const useSendingArshin = () => {
	const [arshinStart] = useStartArshinMutation();
	const [arshinCancel] = useCancelArshinMutation();
	const [arshinValidate] = useValidateArshinMutation();
	const dispatch = useAppDispatch();

	const handleStart = async (data: string[]) => {
		await arshinValidate(data).unwrap();
		await arshinStart(data).unwrap();
	};

	const handleCancel = async () => {
		await arshinCancel().unwrap();
		dispatch(resetState());
	};

	return { handleStart, handleCancel };
};
