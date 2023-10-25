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
		defaultValues: setDefaultValue(data),
		// values: setDefaultValue(data),
		mode: 'all',
	});
	const ttt = methods.trigger;
	const onSubmit = methods.handleSubmit(async data => {
		await sendUpdatedItem(arshinFormaterItem(formTrimming(data))).unwrap();
		closeSidebar();
		EditSidebarArshinItem;
	});

	useEffect(() => {
		ttt();
	}, [ttt]);

	return (
		<Box display='flex' flexDirection='column' flexGrow={1}>
			<FormContainer onSubmit={onSubmit} style={{ flexGrow: 1 }}>
				<FormProvider {...methods}>
					{methods.formState. || <EditArshinItem />}
					<Button type='submit'>Редактировать</Button>
				</FormProvider>
			</FormContainer>
		</Box>
	);
}

export default EditSidebarArshinItem;

// import { Box } from '@mui/material';
// import Button from '@mui/material/Button';
// import { useEffect } from 'react';
// import { FormProvider, useForm } from 'react-hook-form';

// import { useGetFiltersQuery } from '../arshinTableApiSlice';
// import { selectSelectedDoubleClickId } from '../arshinTableSlice';
// import { defaultValueSidebarArshin } from '../config/defaultValueSidebarArshin';
// import { arshinFormaterItem } from '../utils/arshinFormaterItem';

// import EditArshinItem from './EditArshinItem';

// import {
// 	useGetDataByIdQuery,
// 	useUpdateDataItemMutation,
// } from 'features/dataTable/dataTableApiSlice';
// import { useAppSelector } from 'hooks/redux';
// import { useSidebarAction } from 'hooks/useSidebarActions';
// import FormContainer from 'styled/FormContainer';
// import { IFormFilterArshin } from 'types/arshinIntegration';
// import { IDataItemWithDates } from 'types/dataItem';
// import { formTrimming } from 'utils/formTrimming';
// import { setDefaultValue } from 'utils/setDefaultValue';

// export function EditSidebarArshinItem() {
// 	const ids = useAppSelector(selectSelectedDoubleClickId);
// 	const [sendUpdatedItem] = useUpdateDataItemMutation();

// 	const { closeSidebar } = useSidebarAction('arshin');

// 	const { data } = useGetDataByIdQuery(ids, {
// 		skip: !ids,
// 	});
// 	const methods = useForm<Omit<IDataItemWithDates, 'document'>>({
// 		defaultValues: defaultValueSidebarArshin,
// 		values: setDefaultValue(data),
// 		mode: 'all',
// 		shouldUseNativeValidation: true,
// 	});

// 	const onSubmit = methods.handleSubmit(async data => {
// 		await sendUpdatedItem(arshinFormaterItem(formTrimming(data))).unwrap();
// 		closeSidebar();
// 	});
// 	const watchKeys = methods.watch();
// 	const { data: filterConfig = {} as IFormFilterArshin } = useGetFiltersQuery();

// 	useEffect(() => {
// 		const blockList = ['dateOfTheNextVerification', 'verificationDate', 'period'];
// 		console.log('watchKeys', watchKeys);
// 		const truthyKeys = Object.entries(filterConfig)
// 			.filter(([key, value]) => !blockList.includes(key) && value)
// 			.map(([key]) => key) as (keyof Omit<
// 			IFormFilterArshin,
// 			'period' | 'dateOfTheNextVerification' | 'verificationDate'
// 		>)[];

// 		truthyKeys.forEach(key => {
// 			const word = watchKeys[key];

// 			if (!word.length) {
// 				methods.setError(key, { message: 'Заполните поле' });
// 			}
// 		});
// 	}, [filterConfig, methods, watchKeys]);

// 	return (
// 		<Box display='flex' flexDirection='column' flexGrow={1}>
// 			<FormContainer onSubmit={onSubmit} style={{ flexGrow: 1 }}>
// 				<FormProvider {...methods}>
// 					<EditArshinItem />
// 					<Button type='submit'>Редактировать</Button>
// 				</FormProvider>
// 			</FormContainer>
// 		</Box>
// 	);
// }
