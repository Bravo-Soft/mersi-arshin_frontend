import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { defaultValueSidebarArshin } from '../config/defaultValueSidebarArshin';
import { useArshinStepper } from '../hooks/useArshinStepper';
import { arshinFormaterItem } from '../utils/arshinFormaterItem';

import EditArshinItem from './EditArshinItem';

import {
	useGetDataByIdQuery,
	useUpdateDataItemMutation,
} from 'features/dataTable/dataTableApiSlice';
import FormContainer from 'styled/FormContainer';
import { IDataItemWithDates } from 'types/dataItem';
import { formTrimming } from 'utils/formTrimming';
import { setDefaultValue } from 'utils/setDefaultValue';

function EditArshinStepper() {
	const { activeStep, arshinItems, handleSendAction, handleBack } = useArshinStepper();
	const { data } = useGetDataByIdQuery(arshinItems?.[activeStep]?.originId, {
		skip: !arshinItems?.[activeStep]?.originId,
	});

	const [sendUpdatedItem] = useUpdateDataItemMutation();

	const methods = useForm<Omit<IDataItemWithDates, 'document'>>({
		defaultValues: defaultValueSidebarArshin,
		values: setDefaultValue(data),
		mode: 'all',
	});

	const isLastStep = activeStep + 1 === arshinItems.length;

	const onSubmit = methods.handleSubmit(async data => {
		await sendUpdatedItem(arshinFormaterItem(formTrimming(data))).unwrap();
		await handleSendAction();
	});

	return (
		<Box display='flex' flexDirection='column' flexGrow={1}>
			<FormContainer onSubmit={onSubmit} style={{ flexGrow: 1 }} noValidate>
				<FormProvider {...methods}>
					<EditArshinItem />
					<MobileStepper
						variant='text'
						steps={arshinItems.length}
						position='static'
						activeStep={activeStep}
						nextButton={
							<Button sx={{ lineHeight: 1 }} type='submit'>
								{isLastStep ? 'Отправить' : 'Изменить'}
							</Button>
						}
						backButton={
							<Button
								sx={{ color: 'text.disabled', lineHeight: 1 }}
								startIcon={<CloseIcon />}
								onClick={handleBack}
							>
								Убрать
							</Button>
						}
					/>
				</FormProvider>
			</FormContainer>
		</Box>
	);
}

export default EditArshinStepper;
