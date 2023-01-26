import { allInputFields } from './fields';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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
import { useDateValidate } from 'hooks/useDateValidate';
import { Fragment, useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { createDateISO } from 'utils/createDateISO';
import { useFilterAutocomplete } from './hooks/useAutocomplete';

import type { IDataItem, IDataItemWithDates } from 'types/dataItem';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import DateField from 'components/DateField';
import SizeSelect from 'components/SizeSelect';
import ruLocale from 'date-fns/locale/ru';
import ButtonContainer from 'styled/ButtonContainer';
import FormContainer from 'styled/FormContainer';
import Autocomplete from '@mui/material/Autocomplete';

function CreateDataItem(): JSX.Element {
	const today = new Date();
	const dispatch = useAppDispatch();
	const { maxCountRowTable } = useAppSelector(selectUserPermissions);

	const { data } = useGetAllDataQuery();
	const [createNewItem, { isLoading, isSuccess }] = useCreateNewDataItemMutation();

	const methods = useForm<Omit<IDataItemWithDates, 'id'>>({
		defaultValues: {
			size: Tag.SMALL,
			productionDate: today,
			verificationDate: today,
			dateOfTheNextVerification: today,
		},
	});
	const validation = useDateValidate({
		productionDateValue: methods.watch('productionDate'),
		verificationDateValue: methods.watch('verificationDate'),
		dateOfNextVerificationValue: methods.watch('dateOfTheNextVerification'),
	});
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = methods;

	const rowCount = data?.length ?? 0;
	const maxRowsIsReached = isValueDefined(maxCountRowTable) && rowCount >= maxCountRowTable;

	useEffect(() => {
		if (isSuccess) {
			reset();
		}
	}, [isSuccess, reset]);

	const onSubmit = handleSubmit(async newItem => {
		const { productionDate, verificationDate, dateOfTheNextVerification, ...othen } = newItem;

		const prepearedDataItem: Omit<IDataItem, 'id'> = {
			...othen,
			productionDate: createDateISO(productionDate),
			verificationDate: createDateISO(verificationDate),
			dateOfTheNextVerification: createDateISO(dateOfTheNextVerification),
		};

		await createNewItem(prepearedDataItem);
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
				return (
					<FormProvider {...methods} key={key}>
						<SizeSelect />
					</FormProvider>
				);

			case 'productionDate':
			case 'dateOfTheNextVerification':
				return (
					<FormProvider {...methods} key={key}>
						<DateField nameOfKey={key} label={label} validation={validation[key]} />
					</FormProvider>
				);

			case 'verificationDate':
				return (
					<Fragment key={key}>
						<Box my={2}>
							<Divider sx={{ color: 'text.secondary', fontWeight: 500 }}>Поверка СИ</Divider>
						</Box>
						<FormProvider {...methods}>
							<DateField
								nameOfKey={key}
								label={label}
								validation={validation.verificationDate}
							/>
						</FormProvider>
					</Fragment>
				);
			default:
				return key in parametrs ? (
					<Fragment key={key}>
						<FormProvider {...methods}>
							<Controller
								key={key}
								name={key}
								defaultValue=''
								render={({ field: { onChange, ..._field } }) => (
									<Autocomplete
										freeSolo
										options={parametrs[key]}
										onChange={(_event, value) => {
											onChange(value);
										}}
										renderInput={par => {
											return (
												<TextField
													{...par}
													label={label}
													onChange={onChange}
													error={Boolean(errors[key])}
													helperText={errors[key]?.message}
													InputLabelProps={{ shrink: true }}
													// InputProps={{ readOnly: isReader }}
													required={key === 'name'}
												/>
											);
										}}
										{..._field}
									/>
								)}
							/>
						</FormProvider>
					</Fragment>
				) : (
					<TextField
						{...register(key, {
							required: key === 'name' ? 'Это поле обязательное' : undefined,
						})}
						key={key}
						autoComplete='off'
						InputLabelProps={{ shrink: true }}
						helperText={errors[key]?.message}
						required={key === 'name'}
						label={label}
						error={Boolean(errors[key])}
					/>
				);
		}
	});

	return (
		<FormContainer onSubmit={onSubmit} noValidate>
			<Stack px={3.5} rowGap={1}>
				<LocalizationProvider adapterLocale={ruLocale} dateAdapter={AdapterDateFns}>
					{createRenderedField}
				</LocalizationProvider>
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
		</FormContainer>
	);
}

export default CreateDataItem;
