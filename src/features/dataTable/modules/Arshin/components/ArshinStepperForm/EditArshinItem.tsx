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

const requiredValidate = (bool?: boolean) => ({
	value: !bool,
	message: 'Это обязательное поле',
});

function EditArshinItem() {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<Omit<IDataItemWithDates, 'document'>>();

	const { data: filterConfig = {} as IFormFilterArshin } = useGetFiltersQuery();

	const [
		handleValidateDate,
		verificationDateBefore,
		dateOfTheNextVerificationBefore,
		isBeforeCreateOfDateOfTheNextVerification,
		isBeforeCreateOfVerificationDate,
	] = useValidateArshin();

	return (
		<>
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
					{...register('type', { required: requiredValidate(filterConfig?.type) })}
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
						validate: {
							valid: handleValidateDate,
							isBefore: verificationDateBefore,
							isBeforeCreate: isBeforeCreateOfVerificationDate,
						},
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
						validate: {
							valid: handleValidateDate,
							isBefore: dateOfTheNextVerificationBefore,
							isBeforeCreate: isBeforeCreateOfDateOfTheNextVerification,
						},
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
						validate: {
							test: value => Boolean(value.length) || 'Обязательное поле',
						},
					})}
					label={ColumnNames.CERTIFICATE}
					type='text'
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
