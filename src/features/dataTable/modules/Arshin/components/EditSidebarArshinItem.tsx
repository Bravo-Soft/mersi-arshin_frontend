import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { selectSelectedDoubleClickId } from '../arshinTableSlice';
import { defaultValueSidebarArshin } from '../config/defaultValueSidebarArshin';
import { arshinFormaterItem } from '../utils/arshinFormaterItem';

import EditArshinItem from './EditArshinItem';

import {
	useGetDataByIdQuery,
	useUpdateDataItemMutation,
} from 'features/dataTable/dataTableApiSlice';
import { useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';
import FormContainer from 'styled/FormContainer';
import { IDataItemWithDates } from 'types/dataItem';
import { formTrimming } from 'utils/formTrimming';
import { setDefaultValue } from 'utils/setDefaultValue';

function EditSidebarArshinItem() {
	const ids = useAppSelector(selectSelectedDoubleClickId);
	const [sendUpdatedItem] = useUpdateDataItemMutation();

	const { closeSidebar } = useSidebarAction('arshin');

	const { data } = useGetDataByIdQuery(ids, {
		skip: !ids,
	});
	const methods = useForm<Omit<IDataItemWithDates, 'document'>>({
		defaultValues: defaultValueSidebarArshin,
		values: setDefaultValue(data),
		mode: 'all',
	});

	const onSubmit = methods.handleSubmit(async data => {
		await sendUpdatedItem(arshinFormaterItem(formTrimming(data))).unwrap();
		closeSidebar();EditSidebarArshinItem;
	});

	// useEffect(() => {
	// 	methods.formState.defaultValues;
	// }, [methods.formState.defaultValues]);

	return (
		<Box display='flex' flexDirection='column' flexGrow={1}>
			<FormContainer onSubmit={onSubmit} style={{ flexGrow: 1 }}>
				<FormProvider {...methods}>
					<EditArshinItem />
					<Button type='submit'>Редактировать</Button>
				</FormProvider>
			</FormContainer>
		</Box>
	);
}

export default EditSidebarArshinItem;
