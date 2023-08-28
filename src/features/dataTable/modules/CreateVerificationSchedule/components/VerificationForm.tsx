import DialogTitle from '@mui/material/DialogTitle';
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import type { MutableRefObject } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { IForm } from '../operatorsFilters';
import { verificationResolver } from '../utils/verificationResolver';

import ButtonGroup from './ButtonGroup';
import VerificationDialogContent from './VerificationDialogContent';

interface VerificationFormProps {
	apiRef: MutableRefObject<GridApiPro>;
}

function VerificationForm({ apiRef }: VerificationFormProps): JSX.Element {
	const methods = useForm<IForm>({
		defaultValues: { fieldsDate: [null, null] },
		resolver: verificationResolver,
		mode: 'onChange',
	});

	return (
		<FormProvider {...methods}>
			<DialogTitle>Создание графика поверки</DialogTitle>
			<VerificationDialogContent />
			<ButtonGroup apiRef={apiRef} />
		</FormProvider>
	);
}

export default VerificationForm;
