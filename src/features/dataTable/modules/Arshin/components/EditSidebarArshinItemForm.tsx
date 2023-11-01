import { Button, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { selectSelectedDoubleClickId } from '../arshinTableSlice';
import { defaultValueSidebarArshin } from '../config/defaultValueSidebarArshin';
import { useValidateArshin } from '../hooks/useValidateArshin';
import { arshinFormaterItem } from '../utils/arshinFormaterItem';

import SuitabilitySelect from 'components/SuitabilitySelect';
import { ColumnNames } from 'constant/columnsName';
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

	const methods = useForm<Omit<IDataItemWithDates, 'document'>>({
		defaultValues: defaultValueSidebarArshin,
		values: setDefaultValue(data),
		mode: 'onSubmit',
	});
	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
	} = methods;
	const onSubmit = handleSubmit(async data => {
		await sendUpdatedItem(arshinFormaterItem(formTrimming(data))).unwrap();
		closeSidebar();
	});

	const { verificationDateValidate, dateOfTheNextVerificationValidate } = useValidateArshin();

	return (
		<FormContainer onSubmit={onSubmit} style={{ flexGrow: 1 }}>
			<FormProvider {...methods}>
				<Stack direction='column' px={3} pb={3.5} rowGap={1} flexGrow={1}>
					<TextField
						{...register('name')}
						label={ColumnNames.NAME}
						type='text'
						InputLabelProps={{ shrink: true }}
						error={Boolean(errors.name)}
						helperText={errors.name?.message ?? ' '}
					/>
					<TextField
						{...register('type')}
						label={ColumnNames.TYPE}
						type='text'
						InputLabelProps={{ shrink: true }}
						error={Boolean(errors.type)}
						helperText={errors.type?.message ?? ' '}
					/>
					<TextField
						{...register('factoryNumber')}
						label={ColumnNames.FACTORY_NUMBER}
						type='text'
						InputLabelProps={{ shrink: true }}
						error={Boolean(errors.factoryNumber)}
						helperText={errors.factoryNumber?.message ?? ' '}
					/>

					<Controller
						control={control}
						name='verificationDate'
						rules={{
							validate: verificationDateValidate,
						}}
						render={({ field: { ref, ...field }, fieldState: { error } }) => (
							<DatePicker
								{...field}
								label={ColumnNames.VERIFICATION_DATE}
								slotProps={{
									textField: {
										inputRef: ref,
										error: Boolean(error),
										helperText: error?.message ?? ' ',
									},
								}}
							/>
						)}
					/>
					<TextField
						{...register('organization')}
						label={ColumnNames.ORGANIZATION}
						type='text'
						required
						InputLabelProps={{ shrink: true }}
						error={Boolean(errors.organization)}
						helperText={errors.organization?.message ?? ' '}
					/>

					<Controller
						control={control}
						name='dateOfTheNextVerification'
						rules={{
							validate: dateOfTheNextVerificationValidate,
						}}
						render={({ field: { ref, ...field }, fieldState: { error } }) => (
							<DatePicker
								{...field}
								label={ColumnNames.DATE_OF_THE_NEXT_VERIFICATION}
								slotProps={{
									textField: {
										inputRef: ref,
										error: Boolean(error),
										helperText: error?.message ?? ' ',
									},
								}}
							/>
						)}
					/>
					<TextField
						{...register('certificate')}
						label={ColumnNames.CERTIFICATE}
						type='text'
						InputLabelProps={{ shrink: true }}
						error={Boolean(errors.certificate)}
						helperText={errors.certificate?.message ?? ' '}
					/>
					<SuitabilitySelect key='suitability' />
				</Stack>
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
