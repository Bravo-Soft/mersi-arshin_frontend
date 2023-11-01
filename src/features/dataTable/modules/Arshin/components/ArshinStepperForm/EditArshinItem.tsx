import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller, useFormContext } from 'react-hook-form';

import { useGetFiltersQuery } from '../../arshinTableApiSlice';
import { useValidateArshin } from '../../hooks/useValidateArshin';

import SuitabilitySelect from 'components/SuitabilitySelect';
import { ColumnNames } from 'constant/columnsName';
import { IFormFilterArshin } from 'types/arshinIntegration';
import { IDataItemWithDates } from 'types/dataItem';

function EditArshinItem() {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<Omit<IDataItemWithDates, 'document' | 'userIds'>>();

	const { data: filterConfig = {} as IFormFilterArshin } = useGetFiltersQuery();

	const { requiredValidation, verificationDateValidate, dateOfTheNextVerificationValidate } =
		useValidateArshin();

	return (
		<>
			<Stack direction='column' px={3} pb={3.5} rowGap={1} flexGrow={1}>
				<TextField
					{...register('name')}
					label={ColumnNames.NAME}
					disabled
					type='text'
					helperText={' '}
					InputLabelProps={{ shrink: true }}
				/>
				<TextField
					{...register('type', { required: requiredValidation(filterConfig?.type) })}
					label={ColumnNames.TYPE}
					type='text'
					required={filterConfig?.type}
					InputLabelProps={{ shrink: true }}
					error={Boolean(errors.type)}
					helperText={errors.type?.message ?? ' '}
				/>
				<TextField
					{...register('factoryNumber', {
						required: requiredValidation(filterConfig?.factoryNumber),
					})}
					type='text'
					required={filterConfig?.factoryNumber}
					label={ColumnNames.FACTORY_NUMBER}
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
					{...register('organization', {
						required: requiredValidation(filterConfig?.organization),
					})}
					label={ColumnNames.ORGANIZATION}
					type='text'
					required={filterConfig?.organization}
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
					{...register('certificate', {
						required: requiredValidation(filterConfig?.certificate),
					})}
					label={ColumnNames.CERTIFICATE}
					type='text'
					required={filterConfig?.certificate}
					InputLabelProps={{ shrink: true }}
					error={Boolean(errors.certificate)}
					helperText={errors.certificate?.message ?? ' '}
				/>
				<SuitabilitySelect key='suitability' />
			</Stack>
		</>
	);
}

export default EditArshinItem;
