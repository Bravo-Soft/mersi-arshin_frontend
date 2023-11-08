import { Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller, useFormContext } from 'react-hook-form';

import { useValidateArshin } from '../hooks/useValidateArshin';

import SuitabilitySelect from 'components/SuitabilitySelect';
import { ColumnNames } from 'constant/columnsName';
import { IDataItemWithDates } from 'types/dataItem';

function EditSideBarArshinItemFields() {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<Omit<IDataItemWithDates, 'document' | 'userIds'>>();

	const { verificationDateValidate, dateOfTheNextVerificationValidate } = useValidateArshin();

	return (
		<Stack direction='column' px={3} pb={3.5} flexGrow={1}>
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
				rules={{
					validate: dateOfTheNextVerificationValidate,
				}}
				name='dateOfTheNextVerification'
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
	);
}

export default EditSideBarArshinItemFields;
