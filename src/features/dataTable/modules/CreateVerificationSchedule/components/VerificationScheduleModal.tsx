import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
	selectedIsOpenedVerificationScheduleModal,
	setVerificationScheduleModal,
} from 'features/dataTable/dataTableSlice';

import type { MutableRefObject } from 'react';
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';

import VerificationForm from './VerificationForm';
import Dialog from '@mui/material/Dialog';

interface IPopupVerificationScheduleModalProps {
	apiRef: MutableRefObject<GridApiPro>;
}

function VerificationScheduleModal({ apiRef }: IPopupVerificationScheduleModalProps): JSX.Element {
	const isOpenedModal = useAppSelector(selectedIsOpenedVerificationScheduleModal);
	const dispatch = useAppDispatch();

	const closeModal = () => {
		dispatch(setVerificationScheduleModal(false));
	};

	return (
		<Dialog open={isOpenedModal} onClose={closeModal} fullWidth maxWidth='sm'>
			<VerificationForm apiRef={apiRef} />
		</Dialog>
	);
}

export default VerificationScheduleModal;
