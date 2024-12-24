import { Dialog } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { useArshinRequests } from '../../hooks/useArshinRequests';
import { requestItemFormatter } from '../../utils/requestItemFormatter';

import CreateRequestDialogContent from './components/CreateRequestDialogContent';
import CreateRequestDialogTitle from './components/CreateRequestDialogTitle';
import DialogButtons from './components/DialogButtons';

import FormContainer from 'styled/FormContainer';
import { IRequestItemWithDates } from 'types/arshinIntegration';

function CreatingRequestDialog(): JSX.Element {
	const {
		selectedDataIds,
		now,
		futureDate,
		isCreatingRequestDialogOpen,
		handleSendRequest,
		handleCloseDialog,
	} = useArshinRequests();

	const methods = useForm<Omit<IRequestItemWithDates, 'id' | 'creator' | 'status' | 'dataIds'>>({
		defaultValues: {
			name: '',
			range: [now, futureDate],
			period: 1,
			sendEmail: false,
		},
		mode: 'onChange',
	});

	const onSubmit = methods.handleSubmit(async data => {
		await handleSendRequest(requestItemFormatter({ ...data, dataIds: selectedDataIds }));
		methods.reset();
	});

	return (
		<Dialog
			open={isCreatingRequestDialogOpen}
			onClose={handleCloseDialog}
			fullWidth
			maxWidth='sm'
		>
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

export default CreatingRequestDialog;
