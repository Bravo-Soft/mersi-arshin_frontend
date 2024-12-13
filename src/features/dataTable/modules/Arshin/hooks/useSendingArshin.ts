import { useCreateNewRequestMutation, useValidateArshinMutation } from '../arshinTableApiSlice';
import { resetState } from '../eventSourceSlice';

import { useAppDispatch } from 'hooks/redux';
import { IRequestItem } from 'types/arshinIntegration';
/**
 * @package хук отправления данных на проверку в Arshin
 * @function handleStart => функция отправляет выбранную модель id на валидацию , в случае успеха данные пойдут на отправку
 * @function handleCancel => функция отмены проверки позиции
 * @returns возвращает  { handleStart, handleCancel }
 */

export const useSendingArshin = () => {
	const [sendRequest] = useCreateNewRequestMutation();
	const [arshinValidate] = useValidateArshinMutation();

	const dispatch = useAppDispatch();

	const handleStart = async (data: Omit<IRequestItem, 'id' | 'status' | 'creator'>) => {
		await arshinValidate(data).unwrap();
		await sendRequest(data).unwrap();
	};

	const handleCancel = async () => {
		dispatch(resetState());
	};

	return { handleStart, handleCancel };
};
