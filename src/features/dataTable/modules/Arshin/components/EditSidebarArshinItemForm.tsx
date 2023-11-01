import Button from '@mui/material/Button';
import { FormProvider, useForm } from 'react-hook-form';

import { selectSelectedDoubleClickId } from '../arshinTableSlice';
import { defaultValueSidebarArshin } from '../config/defaultValueSidebarArshin';
import { arshinFormaterItem } from '../utils/arshinFormaterItem';

import EditSideBarArshinItemFields from './EditSideBarArshinItemFields';

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
	const ids = useAppSelector(selectSelectedDoubleClickId);
	const [sendUpdatedItem] = useUpdateDataItemMutation();

	const { closeSidebar } = useSidebarAction('arshin');

	const { data } = useGetDataByIdQuery(ids, {
		skip: !ids,
	});

	const methods = useForm<Omit<IDataItemWithDates, 'documents' | 'userIds'>>({
		defaultValues: defaultValueSidebarArshin,
		values: setDefaultValue(data),
		mode: 'onSubmit',
	});

	const onSubmit = methods.handleSubmit(async data => {
		await sendUpdatedItem(arshinFormaterItem(formTrimming(data))).unwrap();
		closeSidebar();
	});

	return (
		<FormContainer onSubmit={onSubmit} style={{ flexGrow: 1 }}>
			<FormProvider {...methods}>
				<EditSideBarArshinItemFields />
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
