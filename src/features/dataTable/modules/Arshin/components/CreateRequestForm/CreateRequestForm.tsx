import { type Dayjs } from 'dayjs';
import { FormProvider, useForm } from 'react-hook-form';

import { useCreateNewRequestMutation } from '../../arshinTableApiSlice';
import { selectSelectedDataIds } from '../../arshinTableSlice';

import CreateRequestDialogContent from './components/CreateRequestDialogContent';
import CreateRequestDialogTitle from './components/CreateRequestDialogTitle';
import DialogButtons from './components/DialogButtons';
import { useRequestDialog } from './hooks/useRequestDialog';

import { useAppSelector } from 'hooks/redux';
import FormContainer from 'styled/FormContainer';
import { IRequestItem } from 'types/arshinIntegration';
import { createDateISO } from 'utils/createDateISO';

// import { verificationResolver } from '../utils/verificationResolver';

// interface ICreateRequestForm {
// 	requestTitle: string;
// 	fieldsDate: Dayjs[] | null[];
// 	periodicity: string;
// }

function CreateRequestForm(): JSX.Element {
	const { now, handleClose, openRequestsSidebarOnSave } = useRequestDialog();
	const [createRequest] = useCreateNewRequestMutation();

	const selectedItems = useAppSelector(selectSelectedDataIds);

	const methods = useForm<IRequestItem>({
		defaultValues: {
			id: now,
			status: 'В процессе',
			requestTitle: now,
			fieldsDate: [null, null],
			periodicity: 1,
			items: selectedItems,
		},
		// resolver: verificationResolver,
		mode: 'onChange',
	});

	const onSubmit = methods.handleSubmit(async data => {
		const upd = { ...data, fieldsDate: data.fieldsDate.map(el => createDateISO(el)) };
		await createRequest(upd);
		handleClose();
		openRequestsSidebarOnSave();
	});

	return (
		<FormContainer onSubmit={onSubmit}>
			<FormProvider {...methods}>
				<CreateRequestDialogTitle />
				<CreateRequestDialogContent />
				<DialogButtons />
			</FormProvider>
		</FormContainer>
	);
}

export default CreateRequestForm;
