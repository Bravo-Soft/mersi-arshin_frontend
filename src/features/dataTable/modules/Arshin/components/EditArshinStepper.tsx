import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, MobileStepper, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
	selectNotValidArshinItem,
	selectSelectedDataItems,
	setSelectedDataItems,
} from '../arshinTableSlice';
import { useSendingArshin } from '../hooks/useSendingArshin';

import EditArshinItem from './EditArshinItem';

import { dateResolver } from 'components/Forms/utils/dataItemResolvers';
import {
	useGetDataByIdQuery,
	useUpdateDataItemMutation,
} from 'features/dataTable/dataTableApiSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';
import FormContainer from 'styled/FormContainer';
import { IDataItem, IDataItemWithDates } from 'types/dataItem';
import { createDateISO } from 'utils/createDateISO';
import { formTrimming } from 'utils/formTrimming';
import { setDefaultValue } from 'utils/setDefaultValue';

type Form = Pick<
	IDataItemWithDates,
	| 'name'
	| 'type'
	| 'factoryNumber'
	| 'verificationDate'
	| 'organization'
	| 'dateOfTheNextVerification'
	| 'certificate'
	| 'suitability'
>;

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

const dateFormTransform = <T extends Omit<IDataItemWithDates, 'id' | 'documents'>>(data: T) => {
	const {
		dateOfTheNextVerification,
		productionDate,
		verificationDate,
		suitability,
		userIds,
		...other
	} = data;
	return {
		...other,
		suitability: JSON.parse(suitability),
		dateOfTheNextVerification: createDateISO(dateOfTheNextVerification),
		productionDate: createDateISO(productionDate),
		verificationDate: createDateISO(verificationDate),
	};
};

function EditArshinStepper() {
	const [activeStep, setActiveStep] = useState(0);
	const arshinItems = useAppSelector(selectNotValidArshinItem);

	const { data } = useGetDataByIdQuery(arshinItems?.[activeStep]?.originId, {
		skip: !arshinItems?.[activeStep]?.originId,
	});
	const [sendUpdatedItem] = useUpdateDataItemMutation();
	const { handleStart } = useSendingArshin();
	const { closeSidebar } = useSidebarAction('arshin');

	const methods = useForm<Omit<IDataItemWithDates, 'document'>>({
		defaultValues,
		values: setDefaultValue(data),
		mode: 'onChange',
	});

	const dispatch = useAppDispatch();
	const model = useAppSelector(selectSelectedDataItems);

	const isLastStep = activeStep + 1 === arshinItems.length;

	const handleNext = () => {
		setActiveStep(prev => prev + 1);
	};

	const sendAction = async () => {
		if (!isLastStep) {
			return handleNext();
		}
		closeSidebar();
		await handleStart();
	};

	const handleBack = async () => {
		if (isLastStep) {
			closeSidebar();
			dispatch(setSelectedDataItems(model.filter(e => e.id !== arshinItems[activeStep].id)));
			await handleStart();
			return;
		}
		handleNext();
		dispatch(setSelectedDataItems(model.filter(e => e.id !== arshinItems[activeStep].id)));
	};

	const onSubmit = methods.handleSubmit(async data => {
		try {
			await sendUpdatedItem(dateFormTransform(formTrimming(data))).unwrap();
			sendAction();
		} catch {
			console.log('los');
		}
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
