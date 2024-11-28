import { Dialog } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { selectRequest, selectSelectedDataIds } from '../../arshinTableSlice';
import { useArshinRequests } from '../../hooks/useArshinRequests';

import CreateRequestDialogContent from './components/CreateRequestDialogContent';
import CreateRequestDialogTitle from './components/CreateRequestDialogTitle';
import DialogButtons from './components/DialogButtons';

import { useAppSelector } from 'hooks/redux';
import FormContainer from 'styled/FormContainer';
import { IRequestItemWithDates } from 'types/arshinIntegration';
import { createDateISO } from 'utils/createDateISO';

function CreatingRequestDialog(): JSX.Element {
	const selectedItems = useAppSelector(selectSelectedDataIds);

	const { now, isCreatingRequestDialogOpen, handleSendRequest, handleCloseDialog } =
		useArshinRequests();

	const methods = useForm<IRequestItemWithDates>({
		defaultValues: {
			requestId: now.toString(),
			status: 'В процессе',
			requestTitle: '',
			fieldsDate: [now, now],
			periodicity: 1,
			items: selectedItems,
			author: '',
		},
		// resolver: verificationResolver,
		mode: 'onChange',
	});

	const onSubmit = methods.handleSubmit(async data => {
		const upd = {
			...data,
			requestTitle: data.requestTitle ?? `Запрос от ${now}`,
			fieldsDate: data.fieldsDate.map(el => createDateISO(el)),
			author: 'Филипп Бедросович',
		};
		await handleSendRequest(upd);
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
