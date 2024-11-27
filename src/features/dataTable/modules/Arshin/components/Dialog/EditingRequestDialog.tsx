import { Dialog } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { selectRequest } from '../../arshinTableSlice';
import { useArshinRequests } from '../../hooks/useArshinRequests';

import CreateRequestDialogContent from './components/CreateRequestDialogContent';
import CreateRequestDialogTitle from './components/CreateRequestDialogTitle';
import DialogButtons from './components/DialogButtons';

import FormContainer from 'styled/FormContainer';
import { IRequestItemWithDates } from 'types/arshinIntegration';
import { createDateISO } from 'utils/createDateISO';

function EditingRequestDialog(): JSX.Element {
	const { selectedRequest, isEditingRequestDialogOpen, handleSendRequest, handleCloseDialog } =
		useArshinRequests();

	const methods = useForm<IRequestItemWithDates>({
		defaultValues: {
			requestId: selectedRequest?.requestId,
			status: selectedRequest?.status,
			requestTitle: selectedRequest?.requestTitle,
			fieldsDate: selectedRequest?.fieldsDate,
			periodicity: selectedRequest?.periodicity,
			items: selectedRequest?.items,
		},
		// resolver: verificationResolver,
		mode: 'onChange',
	});

	const onSubmit = methods.handleSubmit(async data => {
		const upd = {
			...data,
			fieldsDate: data.fieldsDate.map(el => createDateISO(el)),
			author: 'Филипп Бедросович',
		};
		await handleSendRequest(upd);
		methods.reset();
	});

	return (
		<Dialog open={isEditingRequestDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth='sm'>
			<FormContainer onSubmit={onSubmit}>
				<FormProvider {...methods}>
					<CreateRequestDialogTitle />
					<CreateRequestDialogContent />
					<DialogButtons />
				</FormProvider>
			</FormContainer>
		</Dialog>
	);
}

export default EditingRequestDialog;
