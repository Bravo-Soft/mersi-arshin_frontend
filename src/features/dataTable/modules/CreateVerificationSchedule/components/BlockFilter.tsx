import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useFormContext } from 'react-hook-form';
import { operatorsFilters } from '../operatorsFilters';
import { useState } from 'react';
import { useNotificationFormActions } from 'components/Forms/NotificationSettings/hooks/useNotificationFormActions';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { mask, maxDate, minDate } from 'constant/dateMasks';
import { Tag } from 'constant/tag';

import Box from '@mui/material/Box';
import ruLocale from 'date-fns/locale/ru';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import type { SelectChangeEvent } from '@mui/material';
import type { FormFilterType, IForm, IColumnTable } from '../operatorsFilters';
import type { ControllerRenderProps } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';

interface IBlockFilterProps {
	index: number;
	remove: (index: number) => void;
	columnsFilters: IColumnTable[];
}

function BlockFilter({ index, remove, columnsFilters }: IBlockFilterProps) {
	const { watch, control, setValue } = useFormContext<IForm>();

	const watchColumnField = watch(`filters.${index}.columnField`);
	const watchOperatorValue = watch(`filters.${index}.operatorValue`);

	const { filterType } = useNotificationFormActions();
	const [operatorValue, setOperatorValue] = useState<FormFilterType>(filterType(watchColumnField));

	const onChangeColumnField =
		(field: ControllerRenderProps<IForm, `filters.${number}.columnField`>) =>
		(event: SelectChangeEvent<string>) => {
			const eventFilterType = filterType(event.target.value);
			if (eventFilterType !== operatorValue) {
				setOperatorValue(eventFilterType);
				setValue(
					`filters.${index}.operatorValue`,
					operatorsFilters[eventFilterType][0].operatorValue
				);
			}
			if (eventFilterType !== filterType(watchColumnField)) {
				setValue(`filters.${index}.value`, '');
			}
			field.onChange(event.target.value);
		};

	const onChangeOperationField =
		(field: ControllerRenderProps<IForm, `filters.${number}.operatorValue`>) =>
		(event: SelectChangeEvent<string>) => {
			if (watchOperatorValue === 'isEmpty') {
				setValue(`filters.${index}.value`, '');
			}
			field.onChange(event.target.value);
		};

	const removeFilter = (index: number) => () => {
		remove(index);
	};

	return (
		<Box
			display='flex'
			flexDirection='row'
			p={1}
			pr={3.5}
			justifyContent='space-between'
			alignItems='flex-end'
		>
			<IconButton onClick={removeFilter(index)}>
				<CloseIcon />
			</IconButton>
			<Grid container width='100%' spacing={0}>
				<Grid item xs={4}>
					<Controller
						control={control}
						name={`filters.${index}.columnField`}
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
						name={`filters.${index}.operatorValue`}
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
									{operatorsFilters[operatorValue].map(
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
					{watchOperatorValue !== 'isEmpty' && (
						<Controller
							control={control}
							name={`filters.${index}.value`}
							render={({ field, fieldState: { error } }) =>
								operatorValue === 'defaultFilters' ? (
									<TextField
										{...field}
										label='Значение'
										fullWidth
										placeholder='Значение фильтра'
										InputLabelProps={{
											shrink: true,
										}}
									/>
								) : operatorValue === 'dateFilters' ? (
									<LocalizationProvider
										adapterLocale={ruLocale}
										dateAdapter={AdapterDateFns}
									>
										<DatePicker
											{...field}
											mask={mask}
											label={'Дата Фильтрации'}
											minDate={minDate}
											maxDate={maxDate}
											InputProps={{
												error: Boolean(error),
											}}
											renderInput={params => (
												<TextField
													{...params}
													error={Boolean(error)}
													helperText={error?.message}
												/>
											)}
										/>
									</LocalizationProvider>
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
					)}
				</Grid>
			</Grid>
		</Box>
	);
}

export default BlockFilter;
