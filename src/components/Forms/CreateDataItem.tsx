import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { Fragment, useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { allInputFields } from './fields';
import { useFilterAutocomplete } from './hooks/useAutocomplete';
import { createResolver } from './utils/dataItemResolvers';
import { dateFormTransform } from './utils/dateFormTransform';

import AutocompleteField from 'components/AutocompleteField';
import DateField from 'components/DateField';
import SizeSelect from 'components/SizeSelect';
import SuitabilitySelect from 'components/SuitabilitySelect';
import { Messages } from 'constant/messages';
import { Tag } from 'constant/tag';
import {
	useCreateNewDataItemMutation,
	useGetAllDataQuery,
} from 'features/dataTable/dataTableApiSlice';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { selectUserPermissions } from 'features/user/userSlice';
import { isValueDefined } from 'guards/isValueDefined';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import ButtonContainer from 'styled/ButtonContainer';
import FormContainer from 'styled/FormContainer';
import { IDataItemWithDates } from 'types/dataItem';
import { formTrimming } from 'utils/formTrimming';

const today = dayjs(new Date());

const defaultValues = {
	size: Tag.SMALL,
	productionDate: today,
	verificationDate: today,
	dateOfTheNextVerification: today,
	accuracyClass: '',
	certificate: '',
	condition: '',
	division: '',
	factoryNumber: '',
	interVerificationInterval: 0,
	inventoryNumber: '',
	measurementLimit: '',
	name: '',
	notes: '',
	organization: '',
	stateRegister: '',
	type: '',
	typeOfWork: '',
	location: '',
	responsible: '',
	suitability: 'false',
	fgisUrl: '',
	additionalData: '',
	methodology: '',
	cost: '0',
	verificationControlInStateRegister: true,
};

function CreateDataItem(): JSX.Element {
	const dispatch = useAppDispatch();
	const { maxRowsPerTable } = useAppSelector(selectUserPermissions);

	const { data } = useGetAllDataQuery();
	const [createNewItem, { isLoading, isSuccess }] = useCreateNewDataItemMutation();

	const methods = useForm<Omit<IDataItemWithDates, 'id' | 'documents' | 'userIds'>>({
		defaultValues,
		resolver: createResolver,
	});

	const { handleSubmit, reset, control } = methods;

	const rowCount = data?.length ?? 0;
	const maxRowsIsReached = isValueDefined(maxRowsPerTable) && rowCount >= maxRowsPerTable;

	useEffect(() => {
		if (isSuccess) {
			reset();
		}
		return reset();
	}, [isSuccess, reset]);

	const onSubmit = handleSubmit(async newItem => {
		await createNewItem(dateFormTransform(formTrimming(newItem)));
	});

	const handleResetForm = () => {
		reset();
	};

	const handleShowPaymentDialog = () => {
		dispatch(
			changeSmartDialogState({
				variant: 'payment',
				isOpen: true,
				content: Messages.MAX_COUNT_OF_ITEMS_IS_REACHED,
			})
		);
	};

	const parametrs = useFilterAutocomplete();

	const createRenderedField = allInputFields.map(({ key, label }) => {
		switch (key) {
			case 'size':
				return <SizeSelect key={key} />;
			case 'suitability':
				return <SuitabilitySelect key={key} />;
			case 'productionDate':
			case 'dateOfTheNextVerification':
				return <DateField key={key} nameOfKey={key} label={label} />;
			case 'verificationDate':
				return (
					<Fragment key={key}>
						<Box my={2}>
							<Divider sx={{ color: 'text.secondary', fontWeight: 500 }}>Поверка СИ</Divider>
						</Box>
						<DateField nameOfKey={key} label={label} />
					</Fragment>
				);
			case 'interVerificationInterval':
				return (
					<Controller
						name={key}
						key={key}
						control={control}
						render={({ field: { ref, onChange, ...field }, fieldState: { error } }) => (
							<TextField
								{...field}
								label={label}
								error={Boolean(error)}
								helperText={error?.message ?? ' '}
								inputRef={ref}
								onChange={e => onChange(Number(e.target.value))}
								InputLabelProps={{ shrink: true }}
								type='number'
							/>
						)}
					/>
				);

			case 'cost':
				return (
					<TextField
						key={key}
						{...methods.register('cost')}
						label={label}
						error={Boolean(methods.formState.errors.cost)}
						helperText={methods.formState.errors?.cost?.message}
						InputLabelProps={{ shrink: true }}
						InputProps={{
							startAdornment: <InputAdornment position='start'>&#x20bd;</InputAdornment>,
						}}
						type='number'
					/>
				);
			case 'fgisUrl':
				return (
					<TextField
						key={key}
						{...methods.register('fgisUrl')}
						label={label}
						error={Boolean(methods.formState.errors.fgisUrl)}
						helperText={methods.formState.errors?.fgisUrl?.message}
						InputLabelProps={{ shrink: true }}
						type='text'
					/>
				);
			default:
				return (
					<AutocompleteField
						key={key}
						name={key}
						label={label}
						required={key === 'name'}
						autocompleteParams={parametrs[key]}
					/>
				);
		}
	});

	return (
		<FormContainer onSubmit={onSubmit} noValidate>
			<FormProvider {...methods}>
				<Stack px={3.5} rowGap={1}>
					{createRenderedField}
				</Stack>
				<ButtonContainer sx={{ mt: 4 }}>
					<Button
						variant='contained'
						fullWidth
						type={maxRowsIsReached ? 'button' : 'submit'}
						disabled={isLoading}
						onClick={maxRowsIsReached ? handleShowPaymentDialog : undefined}
					>
						Сохранить
					</Button>
					<Button
						fullWidth
						onClick={handleResetForm}
						disabled={!methods.formState.isDirty || isLoading}
					>
						Очистить
					</Button>
				</ButtonContainer>
			</FormProvider>
		</FormContainer>
	);
}

export default CreateDataItem;
