import { Tab, Tabs } from '@mui/material';
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
import type { IDataItemWithDates } from 'types/dataItem';
import { formTrimming } from 'utils/formTrimming';
import { setDefaultValue } from 'utils/setDefaultValue';

function VerificateDataItem(): JSX.Element {
	const [editType, setEditType] = useState('mr');

	const selectedDataItem = useAppSelector(selectSelectedDataItem);
	const { isWriter, isAdmin, isReader } = useAppSelector(selectUserRoles);

	const [sendUpdatedItem, { isLoading: isUpdateLoading }] = useUpdateDataItemMutation();

	const methods = useForm<Omit<IDataItemWithDates, 'userIds'>>({
		values: setDefaultValue(selectedDataItem),
		resolver: formResolver,
		mode: 'onSubmit',
	});

	useUpdateSelectedDataItem(selectedDataItem);

	const handleTypeChange = (_: React.SyntheticEvent, newValue: string) => setEditType(newValue);

	const onSubmit = methods.handleSubmit(async data => {
		await sendUpdatedItem({ ...dateFormTransform(formTrimming(data)), editType }).unwrap();
	});

	return (
		<FormContainer onSubmit={onSubmit} noValidate>
			<FetchingProgress isFetching={isUpdateLoading} />
			{!isUpdateLoading && (
				<FormProvider {...methods}>
					<Tabs
						variant='fullWidth'
						value={editType}
						onChange={handleTypeChange}
						sx={{ mb: 1 }}
					>
						<Tab label='Новая МР' value='mr' />
						<Tab label='Редактирование' value='tr' />
					</Tabs>
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
