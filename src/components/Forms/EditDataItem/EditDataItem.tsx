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

function EditDataItem(): JSX.Element {
	const selectedDataItem = useAppSelector(selectSelectedDataItem);
	const { isReader, isWriter, isAdmin } = useAppSelector(selectUserRoles);

	const [sendUpdatedItem, { isLoading: isUpdateLoading }] = useUpdateDataItemMutation();

	const methods = useForm<IDataItemWithDates>({
		defaultValues: setDefaultValue(selectedDataItem),
	});
	useUpdateSelectedDataItem(selectedDataItem);
	useUpdateInputValues(selectedDataItem, methods.setValue);

	const onSubmit = methods.handleSubmit(async data => {
		const { productionDate, verificationDate, dateOfTheNextVerification, userIds, ...othen } =
			data;

		const prepearedDataItem: Omit<IDataItem, 'userIds'> = {
			...othen,
			productionDate: createDateISO(productionDate),
			verificationDate: createDateISO(verificationDate),
			dateOfTheNextVerification: createDateISO(dateOfTheNextVerification),
		};

		await sendUpdatedItem(prepearedDataItem).unwrap();
	});

	return (
		<FormContainer onSubmit={onSubmit} noValidate>
			<FetchingProgress isFetching={isUpdateLoading} />
			{!isUpdateLoading && (
				<FormProvider {...methods}>
					<EditInputs isReader={isReader} />
				</FormProvider>
			)}
			{(isWriter || isAdmin) && (
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
