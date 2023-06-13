import Button from '@mui/material/Button';
import { FormProvider, useForm } from 'react-hook-form';

import VerificateInputs from './VerificateInputs';

import FetchingProgress from 'features/dataTable/components/FetchingProgress';
import { useUpdateDataItemMutation } from 'features/dataTable/dataTableApiSlice';
import { selectSelectedDataItem } from 'features/dataTable/dataTableSlice';
import { useUpdateInputValues } from 'features/dataTable/hooks/useUpdateInputValues';
import { selectUserRoles } from 'features/user/userSlice';
import { useAppSelector } from 'hooks/redux';
import { useUpdateSelectedDataItem } from 'hooks/useUpdateSelectedDataItem';
import ButtonContainer from 'styled/ButtonContainer';
import FormContainer from 'styled/FormContainer';
import type { IDataItem, IDataItemWithDates } from 'types/dataItem';
import { createDateISO } from 'utils/createDateISO';
import { setDefaultValue } from 'utils/setDefaultValue';

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
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { productionDate, verificationDate, dateOfTheNextVerification, userIds, ...other } =
			data;

		const preparedDataItem: Omit<IDataItem, 'userIds'> = {
			...other,
			productionDate: createDateISO(productionDate),
			verificationDate: createDateISO(verificationDate),
			dateOfTheNextVerification: createDateISO(dateOfTheNextVerification),
		};

		await sendUpdatedItem(preparedDataItem).unwrap();
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
