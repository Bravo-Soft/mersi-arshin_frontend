import { FormProvider, useForm } from 'react-hook-form';
import VerificationDialogContent from './VerificationDialogContent';

import type { IForm } from '../operatorsFilters';
import type { MutableRefObject } from 'react';
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';

import ButtonGroup from './ButtonGroup';
import DialogTitle from '@mui/material/DialogTitle';

interface VerificationFormProps {
	apiRef: MutableRefObject<GridApiPro>;
}

function VerificationForm({ apiRef }: VerificationFormProps): JSX.Element {
	const methods = useForm<IForm>({
		defaultValues: { fieldsDate: [null, null] },
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
