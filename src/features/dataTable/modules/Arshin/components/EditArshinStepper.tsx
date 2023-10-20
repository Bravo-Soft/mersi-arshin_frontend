import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, MobileStepper } from '@mui/material';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';

import { useArshinStepper } from '../hooks/useArshinStepper';
import { arshinFoarmaterItem } from '../utils/arshinFoarmaterItem';

import EditArshinItem from './EditArshinItem';

import {
	useGetDataByIdQuery,
	useUpdateDataItemMutation,
} from 'features/dataTable/dataTableApiSlice';
import FormContainer from 'styled/FormContainer';
import { IDataItemWithDates } from 'types/dataItem';
import { formTrimming } from 'utils/formTrimming';
import { setDefaultValue } from 'utils/setDefaultValue';

const defaultValues = {
	name: '',
	type: '',
	factoryNumber: '',
	verificationDate: dayjs(new Date()),
	organization: '',
	dateOfTheNextVerification: dayjs(new Date()),
	certificate: '',
	suitability: 'false',
};

function EditArshinStepper() {
	const { activeStep, arshinItems, handleSendAction, handleBack } = useArshinStepper();
	const { data } = useGetDataByIdQuery(arshinItems?.[activeStep]?.originId, {
		skip: !arshinItems?.[activeStep]?.originId,
	});

	const [sendUpdatedItem] = useUpdateDataItemMutation();

	const methods = useForm<Omit<IDataItemWithDates, 'document'>>({
		defaultValues,
		values: setDefaultValue(data),
		mode: 'onChange',
	});

	const isLastStep = activeStep + 1 === arshinItems.length;

	const onSubmit = methods.handleSubmit(async data => {
		await sendUpdatedItem(arshinFoarmaterItem(formTrimming(data))).unwrap();
		await handleSendAction();
	});

	return (
		<Box display='flex' flexDirection='column' flexGrow={1}>
			<FormContainer onSubmit={onSubmit} style={{ flexGrow: 1 }}>
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
