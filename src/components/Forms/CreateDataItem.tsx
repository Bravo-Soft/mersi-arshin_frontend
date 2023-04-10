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
import { FormProvider, useForm } from 'react-hook-form';
import { createDateISO } from 'utils/createDateISO';
import { useFilterAutocomplete } from './hooks/useAutocomplete';

import type { IDataItem, IDataItemWithDates } from 'types/dataItem';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import DateField from 'components/DateField';
import SizeSelect from 'components/SizeSelect';
import ruLocale from 'date-fns/locale/ru';
import ButtonContainer from 'styled/ButtonContainer';
import FormContainer from 'styled/FormContainer';
import AutocompleteField from 'components/AutocompleteField';
import { TextField } from '@mui/material';
import { getExtendedIntervalRules } from 'utils/intervalValidate';

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
	const { handleSubmit, reset } = methods;

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

			case 'interVerificationinterval':
				return (
					<TextField
						{...methods.register('interVerificationinterval', getExtendedIntervalRules())}
						label={label}
						key={key}
						error={Boolean(methods.formState.errors.interVerificationinterval)}
						helperText={methods.formState.errors?.interVerificationinterval?.message}
						InputLabelProps={{ shrink: true }}
						type='number'
					/>
				);

			default:
				return (
					<FormProvider {...methods} key={key}>
						<AutocompleteField
							name={key}
							label={label}
							required={key === 'name'}
							autocompleteParams={parametrs[key]}
						/>
					</FormProvider>
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
