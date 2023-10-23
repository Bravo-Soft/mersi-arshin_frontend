import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

import { useGetFiltersQuery } from '../arshinTableApiSlice';

import SuitabilitySelect from 'components/SuitabilitySelect';
import { ColumnNames } from 'constant/columnsName';
import { dayjsFormatVariant } from 'constant/dateFormat';
import { IDataItemWithDates } from 'types/dataItem';

const requiredValidate = (bool?: boolean) => ({
	value: Boolean(bool),
	message: 'Это обязательное поле',
});

function EditArshinItem() {
	const {
		register,
		control,
		formState: { errors },
		watch,
	} = useFormContext<Omit<IDataItemWithDates, 'document'>>();

	const { data } = useGetFiltersQuery();

	const { verificationDate, dateOfTheNextVerification } = watch();

	return (
		<>
			<Stack direction='column' px={3} pb={3.5} rowGap={1} flexGrow={1}>
				<TextField
					{...register('name', { required: requiredValidate(true) })}
					label={ColumnNames.TYPE}
					type='text'
					InputLabelProps={{ shrink: true }}
					error={Boolean(errors.name)}
					helperText={errors.name?.message ?? ' '}
				/>
				<TextField
					{...register('type', { required: requiredValidate(data?.type) })}
					label={ColumnNames.TYPE}
					type='text'
					InputLabelProps={{ shrink: true }}
					error={Boolean(errors.type)}
					helperText={errors.type?.message ?? ' '}
				/>
				<TextField
					{...register('factoryNumber', { required: requiredValidate(data?.factoryNumber) })}
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
							valid: v => v.isValid() || 'Неверный формат даты',
							p: date =>
								dayjs(date).isBefore(dayjs(dateOfTheNextVerification)) ||
								`Дата поверки должна идти раньше даты следующей поверки, либо быть равной ей (${dayjs(
									dateOfTheNextVerification
								).format(dayjsFormatVariant)})`,
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
					{...register('organization', { required: requiredValidate(data?.organization) })}
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
							valid: v => v.isValid() || 'Неверный формат даты',
							p: date =>
								dayjs(verificationDate).isBefore(dayjs(date)) ||
								`Дата следующей поверки должна идти после даты поверки, либо быть равной ей (${dayjs(
									verificationDate
								).format(dayjsFormatVariant)})`,
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
					{...register('certificate', { required: requiredValidate(data?.organization) })}
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
