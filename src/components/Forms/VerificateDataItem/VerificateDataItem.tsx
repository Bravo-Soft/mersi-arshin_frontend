import { useUpdateDataItemMutation } from 'features/dataTable/dataTableApiSlice';
import { selectSelectedDataItem } from 'features/dataTable/dataTableSlice';
import { useUpdateInputValues } from 'features/dataTable/hooks/useUpdateInputValues';
import { selectUserRoles } from 'features/user/userSlice';
import { useAppSelector } from 'hooks/redux';
import { FormProvider, useForm } from 'react-hook-form';
import { createDateISO } from 'utils/createDateISO';
import { setDefaultValue } from 'utils/setDefaultValue';
import { useUpdateSelectedDataItem } from 'hooks/useUpdateSelectedDataItem';

import type { IDataItem, IDataItemWithDates } from 'types/dataItem';

import Button from '@mui/material/Button';
import FetchingProgress from 'features/dataTable/components/FetchingProgress';
import ButtonContainer from 'styled/ButtonContainer';
import FormContainer from 'styled/FormContainer';
import VerificateInputs from './VerificateInputs';

function VerificateDataItem(): JSX.Element {
	const selectedDataItem = useAppSelector(selectSelectedDataItem);
	const { isWriter, isAdmin, isReader } = useAppSelector(selectUserRoles);

	const [sendUpdatedItem, { isLoading: isUpdateLoading }] = useUpdateDataItemMutation();
	const methods = useForm<IDataItemWithDates>({
		values: setDefaultValue(selectedDataItem),
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
					<VerificateInputs isReader={isReader} />
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

export default VerificateDataItem;
