import Button from '@mui/material/Button';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { formResolver } from '../utils/dataItemResolvers';
import { dateFormTransform } from '../utils/dateFormTransform';

import VerificateInputs from './VerificateInputs';

import FetchingProgress from 'features/dataTable/components/FetchingProgress';
import { useUpdateDataItemMutation } from 'features/dataTable/dataTableApiSlice';
import { selectSelectedDataItem } from 'features/dataTable/dataTableSlice';
import { selectUserRoles } from 'features/user/userSlice';
import { useAppSelector } from 'hooks/redux';
import { useUpdateSelectedDataItem } from 'hooks/useUpdateSelectedDataItem';
import ButtonContainer from 'styled/ButtonContainer';
import FormContainer from 'styled/FormContainer';
import StyledToggleButton from 'styled/StyledToggleButton';
import StyledToggleButtonGroup from 'styled/StyledToggleButtonGroup';
import type { IDataItemWithDates } from 'types/dataItem';
import { formTrimming } from 'utils/formTrimming';
import { setDefaultValue } from 'utils/setDefaultValue';

function VerificateDataItem(): JSX.Element {
	const [editType, setEditType] = useState('tr');

	const selectedDataItem = useAppSelector(selectSelectedDataItem);
	const { isWriter, isAdmin, isReader } = useAppSelector(selectUserRoles);

	const [sendUpdatedItem, { isLoading: isUpdateLoading }] = useUpdateDataItemMutation();

	const methods = useForm<Omit<IDataItemWithDates, 'userIds'>>({
		values: setDefaultValue(selectedDataItem),
		resolver: formResolver,
		mode: 'onSubmit',
	});

	useUpdateSelectedDataItem(selectedDataItem);

	const onSubmit = methods.handleSubmit(async data => {
		await sendUpdatedItem({ ...dateFormTransform(formTrimming(data)), editType }).unwrap();
	});

	return (
		<FormContainer onSubmit={onSubmit} noValidate>
			<FetchingProgress isFetching={isUpdateLoading} />
			{!isUpdateLoading && (
				<FormProvider {...methods}>
					<StyledToggleButtonGroup
						color='primary'
						value={editType}
						exclusive
						onChange={(_, newValue) => setEditType(newValue)}
						sx={{ display: 'flex', justifyContent: 'center' }}
					>
						<StyledToggleButton value='mr'>Новая МР</StyledToggleButton>
						<StyledToggleButton value='tr'>Редактирование</StyledToggleButton>
					</StyledToggleButtonGroup>
					<VerificateInputs isReader={isReader} />
				</FormProvider>
			)}
			{(isWriter || isAdmin) && (
				<ButtonContainer>
					<Button
						variant='contained'
						fullWidth
						type='submit'
						disabled={isUpdateLoading || !methods.formState.isDirty}
					>
						Сохранить
					</Button>
				</ButtonContainer>
			)}
		</FormContainer>
	);
}

export default VerificateDataItem;
