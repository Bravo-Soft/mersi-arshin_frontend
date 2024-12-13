import { Dialog } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { selectRequest } from '../../arshinTableSlice';
import { useArshinRequests } from '../../hooks/useArshinRequests';
import { updateRequestItemFormatter } from '../../utils/requestItemFormatter';
import { setDefaultValue } from '../../utils/setDefaultValue';

import CreateRequestDialogContent from './components/CreateRequestDialogContent';
import CreateRequestDialogTitle from './components/CreateRequestDialogTitle';
import DialogButtons from './components/DialogButtons';

import { useAppSelector } from 'hooks/redux';
import FormContainer from 'styled/FormContainer';
import { IRequestItemWithDates } from 'types/arshinIntegration';

function EditingRequestDialog(): JSX.Element {
	const selectedRequest = useAppSelector(selectRequest);
	const { isEditingRequestDialogOpen, handleUpdateRequest, handleCloseDialog } =
		useArshinRequests();

	const methods = useForm<Omit<IRequestItemWithDates, 'dataIds' | 'status' | 'creator'>>({
		values: setDefaultValue(selectedRequest),
		// resolver: verificationResolver,
		mode: 'onChange',
	});

	const onSubmit = methods.handleSubmit(data => {
		handleUpdateRequest(updateRequestItemFormatter(data));
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
