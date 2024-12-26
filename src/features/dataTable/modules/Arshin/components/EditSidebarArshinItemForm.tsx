import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { selectSelectedEditItemIds } from '../arshinTableSlice';
import { defaultValueSidebarArshin } from '../config/defaultValueSidebarArshin';
import { arshinFormaterItem } from '../utils/arshinFormaterItem';

import EditSideBarArshinItemFields from './EditSideBarArshinItemFields';

import FetchingProgress from 'features/dataTable/components/FetchingProgress';
import {
	useGetDataByIdQuery,
	useUpdateDataItemMutation,
} from 'features/dataTable/dataTableApiSlice';
import { useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';
import ButtonContainer from 'styled/ButtonContainer';
import FormContainer from 'styled/FormContainer';
import { IDataItemWithDates } from 'types/dataItem';
import { formTrimming } from 'utils/formTrimming';
import { setDefaultValue } from 'utils/setDefaultValue';

function EditSidebarArshinItemForm() {
	const ids = useAppSelector(selectSelectedEditItemIds);
	const [sendUpdatedItem] = useUpdateDataItemMutation();

	const { closeSidebar } = useSidebarAction('arshin');

	const { data, isLoading: isUpdateLoading } = useGetDataByIdQuery(ids, {
		skip: !ids,
	});

	const methods = useForm<
		Omit<IDataItemWithDates, 'userIds' | 'fgisUrl' | 'verificationControlInStateRegister'>
	>({
		defaultValues: defaultValueSidebarArshin,
		values: setDefaultValue(data),
		mode: 'all',
	});

	const {
		handleSubmit,
		trigger,
		formState: { isDirty, isValidating },
	} = methods;

	const onSubmit = handleSubmit(async data => {
		await sendUpdatedItem(arshinFormaterItem(formTrimming(data))).unwrap();
		closeSidebar();
	});

	useEffect(() => {
		if (!isDirty || !isValidating) trigger();
	}, [isDirty, trigger, isValidating]);

	return (
		<FormContainer onSubmit={onSubmit} style={{ flexGrow: 1 }}>
			<FormProvider {...methods}>
				{isUpdateLoading ? (
					<FetchingProgress isFetching={isUpdateLoading} />
				) : (
					<EditSideBarArshinItemFields />
				)}
				<Box
					component={'div'}
					boxShadow={' 0px 0px 10px 0px rgba(34, 60, 80, 0.2)'}
					sx={{
						border: '2px solid #0b4e60',
						borderRadius: 1,
						p: 1,
						width: 300,
						m: '5px auto',
					}}
				>
					<Typography textAlign={'center'} variant='body1'>
						Изменения будут также внесены в единый реестр
					</Typography>
				</Box>

				<ButtonContainer>
					<Button variant='contained' fullWidth type='submit'>
						Редактировать
					</Button>
				</ButtonContainer>
			</FormProvider>
		</FormContainer>
	);
}

export default EditSidebarArshinItemForm;
