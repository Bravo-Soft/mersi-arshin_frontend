import { FormProvider, useForm } from 'react-hook-form';

import { deleteNotValidArshinItem } from '../../arshinTableSlice';
import { defaultValueSidebarArshin } from '../../config/defaultValueSidebarArshin';
import { useArshinStepper } from '../../hooks/useArshinStepper';
import { arshinFormaterItem } from '../../utils/arshinFormaterItem';

import ArshinEditInputs from './ArshinEditInputs';

import FetchingProgress from 'features/dataTable/components/FetchingProgress';
import {
	useGetDataByIdQuery,
	useUpdateDataItemMutation,
} from 'features/dataTable/dataTableApiSlice';
import { useAppDispatch } from 'hooks/redux';
import FormContainer from 'styled/FormContainer';
import { IDataItemWithDates } from 'types/dataItem';
import { formTrimming } from 'utils/formTrimming';
import { setDefaultValue } from 'utils/setDefaultValue';

function EditArshinStepperForm() {
	const dispatch = useAppDispatch();
	const { activeStep, arshinItems, handleSendAction, handleBack } = useArshinStepper();
	const { data, isLoading: isUpdateLoading } = useGetDataByIdQuery(
		arshinItems?.[activeStep]?.originId,
		{
			skip: !arshinItems?.[activeStep]?.originId,
		}
	);

	const [sendUpdatedItem] = useUpdateDataItemMutation();

	const methods = useForm<Omit<IDataItemWithDates, 'documents' | 'userIds'>>({
		defaultValues: defaultValueSidebarArshin,
		values: setDefaultValue(data),
		mode: 'all',
		resetOptions: {
			keepErrors: true,
			keepDirtyValues: true,
		},
	});

	const isLastStep = activeStep + 1 === arshinItems.length;

	const onSubmit = methods.handleSubmit(async data => {
		await sendUpdatedItem(arshinFormaterItem(formTrimming(data))).unwrap();
		await handleSendAction();
		dispatch(deleteNotValidArshinItem(data.id));
		methods.reset();
	});

	return (
		<FormContainer onSubmit={onSubmit} style={{ flexGrow: 1 }} noValidate>
			<FetchingProgress isFetching={isUpdateLoading} />
			{!isUpdateLoading && (
				<FormProvider {...methods}>
					<ArshinEditInputs
						arshinItems={arshinItems}
						activeStep={activeStep}
						handleBack={handleBack}
						isLastStep={isLastStep}
					/>
				</FormProvider>
			)}
		</FormContainer>
	);
}

export default EditArshinStepperForm;
