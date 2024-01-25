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

	const methods = useForm<Omit<IDataItemWithDates, 'userIds'>>({
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
