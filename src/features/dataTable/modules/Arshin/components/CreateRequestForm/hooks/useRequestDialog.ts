import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import { selectIsOpenCreateRequestModal, setCreateRequestModal } from '../../../arshinTableSlice';

import { dayjsFormatVariant } from 'constant/dateFormat';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';

export const useRequestDialog = () => {
	const dispatch = useAppDispatch();

	const open = useAppSelector(selectIsOpenCreateRequestModal);

	const { openSidebarWith } = useSidebarAction('arshin');
	const openRequestsSidebarOnSave = () => openSidebarWith('RequestsList');

	const handleClose = () => {
		dispatch(setCreateRequestModal(false));
	};

	const now = `Запрос от ${dayjs(Date.now()).format(dayjsFormatVariant)}`;

	return { now, open, openRequestsSidebarOnSave, handleClose };
};
