import CloseIcon from '@mui/icons-material/Close';
import { InputAdornment } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { isDayjs } from 'dayjs';
import { useState } from 'react';
import type { Control, ControllerRenderProps } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

import { columnsFilters, linkOperators, operatorsFilters } from '../data';
import { defaultFilterValue } from '../defaultFilterValue';
import { useNotificationFormActions } from '../hooks/useNotificationFormActions';
import type { FormFiltersTypes } from '../types';

import SuitabilitySelect from 'components/SuitabilitySelect';
import { ColumnNames } from 'constant/columnsName';
import { maxDate, minDate } from 'constant/dateMasks';
import { Tag } from 'constant/tag';
import type { INotificationSettings } from 'types/notification';

interface INotificationFilterItemProps {
	index: number;
	indexK: number;
	control: Control<INotificationSettings, `subscribedEmails.${number}.emailFilters`>;
	removeEmail: (indexRemove: number) => () => void;
}

function NotificationFilterItem({
	index,
	indexK,
	control,
	removeEmail,
}: INotificationFilterItemProps) {
	const {
		setValue,
		watch,
		register,
		formState: { errors },
	} = useFormContext<INotificationSettings>();

	const watchColumnField = watch(`subscribedEmails.${index}.emailFilters.${indexK}.columnFilter`);
	const watchOperatorValue = watch(
		`subscribedEmails.${index}.emailFilters.${indexK}.operatorValue`
	);

	const { filterType } = useNotificationFormActions();
	const [operatorValueX, setOperatorValue] = useState<FormFiltersTypes>(
		filterType(watchColumnField)
	);

	const onChangeColumnField =
		(
			field: ControllerRenderProps<
				INotificationSettings,
				`subscribedEmails.${number}.emailFilters.${number}.columnFilter`
			>
		) =>
		(event: SelectChangeEvent<string>) => {
			const eventFilterType = filterType(event.target.value);

			if (eventFilterType !== operatorValueX) {
				setOperatorValue(eventFilterType);
				setValue(
					`subscribedEmails.${index}.emailFilters.${indexK}.operatorValue`,
					operatorsFilters[eventFilterType][0].operatorValue
				);
			}

			if (eventFilterType !== filterType(watchColumnField)) {
				setValue(
					`subscribedEmails.${index}.emailFilters.${indexK}.value`,
					defaultFilterValue(eventFilterType)
				);
			}

			field.onChange(event.target.value);
		};

	const onChangeOperationField =
		(
			field: ControllerRenderProps<
				INotificationSettings,
				`subscribedEmails.${number}.emailFilters.${number}.operatorValue`
			>
		) =>
		(event: SelectChangeEvent<string>) => {
			if (watchOperatorValue === 'isEmpty') {
				setValue(`subscribedEmails.${index}.emailFilters.${indexK}.value`, '');
			}
			field.onChange(event.target.value);
		};

	return (
		<Stack direction='row' p={1} justifyContent='space-between' alignItems='flex-end' spacing={2}>
			<Stack direction='row'>
				<IconButton onClick={removeEmail(indexK)}>
					<CloseIcon />
				</IconButton>
				{indexK !== 0 && (
					<Controller
						control={control}
						name={`subscribedEmails.${index}.linkOperator`}
						render={({ field }) => (
							<FormControl variant='standard' size='medium'>
								<Select
									{...field}
									value={field.value}
									disabled={indexK !== 1}
									sx={{ width: 58 }}
								>
									{linkOperators.map(({ linkValue, linkTitle }) => (
										<MenuItem key={`${linkValue}_${linkTitle}`} value={linkValue}>
											{linkTitle}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}
					/>
				)}
			</Stack>
			<Grid container width={478} spacing={0}>
				<Grid item xs={4}>
					<Controller
						control={control}
						name={`subscribedEmails.${index}.emailFilters.${indexK}.columnFilter`}
						render={({ field }) => (
							<FormControl variant='standard' fullWidth>
								<InputLabel id='select-date-of-sending-label'>Столбцы</InputLabel>
								<Select
									{...field}
									value={field.value}
									id='select-column-filter'
									labelId='select-column-filter-label'
									onChange={onChangeColumnField(field)}
									fullWidth
									MenuProps={{
										PaperProps: {
											sx: {
												maxHeight: 200,
											},
										},
									}}
								>
									{columnsFilters.map(({ field, headerName }) => (
										<MenuItem key={`${field}_${headerName}`} value={field}>
											{headerName}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}
					/>
				</Grid>
				<Grid item xs={4}>
					<Controller
						control={control}
						name={`subscribedEmails.${index}.emailFilters.${indexK}.operatorValue`}
						render={({ field }) => (
							<FormControl variant='standard' fullWidth>
								<InputLabel id='select-operator-filter-label'>Операторы</InputLabel>
								<Select
									{...field}
									value={field.value}
									id='select-operator-filter'
									labelId='select-operator-filter-label'
									onChange={onChangeOperationField(field)}
									fullWidth
									MenuProps={{
										PaperProps: {
											sx: {
												maxHeight: 200,
											},
										},
									}}
								>
									{operatorsFilters[operatorValueX].map(
										({ operatorValue, columnField }) => (
											<MenuItem
												key={`${operatorValue}_${columnField}`}
												value={operatorValue}
											>
												{columnField}
											</MenuItem>
										)
									)}
								</Select>
							</FormControl>
						)}
					/>
				</Grid>
				<Grid item xs={4}>
					{watchOperatorValue !== 'isEmpty' &&
						(operatorValueX === 'interVerificationInterval' ? (
							<Controller
								name={`subscribedEmails.${index}.emailFilters.${indexK}.value`}
								key='interVerificationInterval'
								control={control}
								render={({ field: { ref, onChange, ...field }, fieldState: { error } }) => (
									<TextField
										{...field}
										label={ColumnNames.VERIFICATION_INTERVAL}
										error={Boolean(error)}
										helperText={error?.message ?? ' '}
										inputRef={ref}
										onChange={e => onChange(Number(e.target.value))}
										InputLabelProps={{ shrink: true }}
										type='number'
									/>
								)}
							/>
						) : operatorValueX === 'suitability' ? (
							<SuitabilitySelect key='suitability' />
						) : operatorValueX === 'cost' ? (
							<TextField
								key='cost'
								{...register(`subscribedEmails.${index}.emailFilters.${indexK}.value`)}
								label={ColumnNames.COST}
								// error={Boolean(errors.subscribedEmails[index].emailFilters[indexK].value)}
								InputLabelProps={{ shrink: true }}
								InputProps={{
									startAdornment: <InputAdornment position='start'>₽</InputAdornment>,
								}}
								inputProps={{
									step: 0.01,
								}}
								type='number'
							/>
						) : (
							<Controller
								control={control}
								name={`subscribedEmails.${index}.emailFilters.${indexK}.value`}
								render={({ field, fieldState: { error } }) =>
									operatorValueX === 'defaultFilters' ? (
										<TextField
											{...field}
											label='Значение'
											fullWidth
											placeholder='Значение фильтра'
											InputLabelProps={{
												shrink: true,
											}}
										/>
									) : operatorValueX === 'dateFilters' ? (
										<DatePicker
											{...field}
											value={dayjs(field.value)}
											onChange={newDate => {
												if (isDayjs(newDate)) {
													field.onChange(newDate);
												}
											}}
											label='Дата фильтрации'
											slotProps={{
												textField: {
													inputRef: field.ref,
													error: Boolean(error),
												},
											}}
											minDate={dayjs(minDate)}
											maxDate={dayjs(maxDate)}
										/>
									) : (
										<FormControl variant='standard' fullWidth>
											<InputLabel shrink={true} id='select-operator-filter-label'>
												Значение
											</InputLabel>
											<Select
												{...field}
												id='select-operator-filter'
												labelId='select-operator-filter-label'
											>
												<MenuItem value={Tag.SMALL}>{Tag.SMALL}</MenuItem>
												<MenuItem value={Tag.MEDIUM}>{Tag.MEDIUM}</MenuItem>
												<MenuItem value={Tag.LARGE}>{Tag.LARGE}</MenuItem>
											</Select>
										</FormControl>
									)
								}
							/>
						))}
				</Grid>
			</Grid>
		</Stack>
	);
}

export default NotificationFilterItem;
