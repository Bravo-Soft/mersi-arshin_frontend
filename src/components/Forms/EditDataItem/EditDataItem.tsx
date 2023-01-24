import { useAppSelector } from 'hooks/redux';
import { createDateISO } from 'utils/createDateISO';
import { setDefaultValue } from 'utils/setDefaultValue';
import { FormProvider, useForm } from 'react-hook-form';
import { selectUserRoles } from 'features/user/userSlice';
import { selectSelectedDataItem } from 'features/dataTable/dataTableSlice';
import { useUpdateSelectedDataItem } from 'hooks/useUpdateSelectedDataItem';
import { useUpdateDataItemMutation } from 'features/dataTable/dataTableApiSlice';
import { useUpdateInputValues } from 'features/dataTable/hooks/useUpdateInputValues';

import type { IDataItem, IDataItemWithDates } from 'types/dataItem';

import EditInputs from './EditInputs';
import Button from '@mui/material/Button';
import FormContainer from 'styled/FormContainer';
import ButtonContainer from 'styled/ButtonContainer';
import FetchingProgress from 'features/dataTable/components/FetchingProgress';
import { useAutocomplete } from '../hooks/useAutocomplete';

function EditDataItem(): JSX.Element {
	const selectedDataItem = useAppSelector(selectSelectedDataItem);
	const { isWriter } = useAppSelector(selectUserRoles);

	const [sendUpdatedItem, { isLoading: isUpdateLoading }] = useUpdateDataItemMutation();

	const methods = useForm<IDataItemWithDates>({
		defaultValues: setDefaultValue(selectedDataItem),
	});
	useUpdateSelectedDataItem(selectedDataItem);
	useUpdateInputValues(selectedDataItem, methods.setValue);

	const onSubmit = methods.handleSubmit(async data => {
		const { productionDate, verificationDate, dateOfTheNextVerification, ...othen } = data;

		const prepearedDataItem: IDataItem = {
			...othen,
			productionDate: createDateISO(productionDate),
			verificationDate: createDateISO(verificationDate),
			dateOfTheNextVerification: createDateISO(dateOfTheNextVerification),
		};

		await sendUpdatedItem(prepearedDataItem).unwrap();
	});

	const x = useAutocomplete(['name', 'type']);
	console.log('x', x);

	return (
		<FormContainer onSubmit={onSubmit} noValidate>
			<FetchingProgress isFetching={isUpdateLoading} />
			{!isUpdateLoading && (
				<FormProvider {...methods}>
					<EditInputs isWriter={isWriter} />
				</FormProvider>
			)}
			{isWriter && (
				<ButtonContainer>
					<Button variant='contained' fullWidth type='submit' disabled={isUpdateLoading}>
						Сохранить
					</Button>
				</ButtonContainer>
			)}
		</FormContainer>
	);
}

export default EditDataItem;
