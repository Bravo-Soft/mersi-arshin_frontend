import { Stack, TextField, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { ColumnNames } from 'constant/columnsName';
import FormContainer from 'styled/FormContainer';
import { IFormFilterArshin } from 'types/arshinIntegration';

interface IEditArshinConfig {
	key: keyof IFormFilterArshin;
	label: ColumnNames;
	disabled?: boolean;
}

const editArshinConfig: IEditArshinConfig[] = [
	{
		key: 'type',
		label: ColumnNames.TYPE,
		disabled: true,
	},
	{
		key: 'factoryNumber',
		disabled: true,
		label: ColumnNames.FACTORY_NUMBER,
	},
	{
		key: 'verificationDate',
		disabled: true,
		label: ColumnNames.VERIFICATION_DATE,
	},
	{
		key: 'organization',
		label: ColumnNames.ORGANIZATION,
	},
];

function EditArshinItem() {
	const { register } = useForm();
	console.log('render');
	return (
		<FormContainer>
			<Stack direction='column' px={3} pb={3.5} rowGap={1} flexGrow={1}>
				{editArshinConfig.map(props => (
					<TextField {...register(props.key)} {...props} InputLabelProps={{ shrink: true }} />
				))}
			</Stack>
		</FormContainer>
	);
}

export default EditArshinItem;
