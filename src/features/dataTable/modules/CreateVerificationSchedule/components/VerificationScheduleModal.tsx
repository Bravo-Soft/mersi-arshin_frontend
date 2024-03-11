import Dialog from '@mui/material/Dialog';
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import type { MutableRefObject } from 'react';

import VerificationForm from './VerificationForm';

import {
	selectedIsOpenedVerificationScheduleModal,
	setVerificationScheduleModal,
} from 'features/dataTable/dataTableSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

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
