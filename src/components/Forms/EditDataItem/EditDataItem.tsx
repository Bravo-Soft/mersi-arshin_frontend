import Button from '@mui/material/Button';
import { FormProvider, useForm } from 'react-hook-form';

import { dateItemSchema, formResolver } from '../dataItemResolvers';

import EditInputs from './EditInputs';

import FetchingProgress from 'features/dataTable/components/FetchingProgress';
import { useUpdateDataItemMutation } from 'features/dataTable/dataTableApiSlice';
import { selectSelectedDataItem } from 'features/dataTable/dataTableSlice';
import { selectUserRoles } from 'features/user/userSlice';
import { useAppSelector } from 'hooks/redux';
import { useUpdateSelectedDataItem } from 'hooks/useUpdateSelectedDataItem';
import ButtonContainer from 'styled/ButtonContainer';
import FormContainer from 'styled/FormContainer';
import type { IDataItemWithDates } from 'types/dataItem';
import { setDefaultValue } from 'utils/setDefaultValue';

function EditDataItem(): JSX.Element {
	const selectedDataItem = useAppSelector(selectSelectedDataItem);
	const { isReader, isWriter, isAdmin } = useAppSelector(selectUserRoles);

	const [sendUpdatedItem, { isLoading: isUpdateLoading }] = useUpdateDataItemMutation();

	const methods = useForm<IDataItemWithDates>({
		values: setDefaultValue(selectedDataItem),
		resolver: formResolver,
	});

	useUpdateSelectedDataItem(selectedDataItem);

	const onSubmit = methods.handleSubmit(async data => {
		await sendUpdatedItem(dateItemSchema.parse(data)).unwrap();
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
