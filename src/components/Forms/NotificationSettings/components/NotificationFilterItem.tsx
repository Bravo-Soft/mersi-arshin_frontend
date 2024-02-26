import CloseIcon from '@mui/icons-material/Close';
import { InputAdornment } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { isDayjs } from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

import { operatorsFilters } from '../data';
import useNameGenerator from '../hooks/useNameGenerator';
import { useNotificationAction } from '../hooks/useNotificationAction';

import NotificationColumnFilter from './NotificationColumnFilter';
import NotificationLinkOperator from './NotificationLinkOperator';

import { ColumnNames } from 'constant/columnsName';
import { maxDate, minDate } from 'constant/dateMasks';
import { Tag } from 'constant/tag';
import type { INotificationSettings } from 'types/notification';

interface INotificationFilterItemProps {
	index: number;
	indexK: number;
	// control: Control<INotificationSettings, `subscribedEmails.${number}.emailFilters`>;
	removeEmail: (indexRemove: number) => () => void;
}

function NotificationFilterItem(props: INotificationFilterItemProps) {
	const { index, indexK, removeEmail } = props;

	const { register, control } = useFormContext<INotificationSettings>();

	const { linkName, columnName } = useNameGenerator({ index, indexK });

	const { onChangeColumnField, onChangeOperationField, operatorValueX, watchOperatorValue } =
		useNotificationAction({
			index,
			indexK,
		});

	return (
		<Stack direction='row' p={1} justifyContent='space-between' alignItems='flex-end' spacing={2}>
			<Stack direction='row'>
				<IconButton onClick={removeEmail(indexK)}>
					<CloseIcon />
				</IconButton>
				<NotificationLinkOperator control={control} name={linkName} indexK={indexK} />
			</Stack>
			<Grid container width={478} spacing={0}>
				<Grid item xs={4}>
					<NotificationColumnFilter
						// control={control}
						name={columnName}
						onChange={onChangeColumnField}
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
							<FormControl fullWidth variant='standard'>
								<InputLabel shrink={true} id='suitability-id'>
									{ColumnNames.SUITABILITY}
								</InputLabel>
								<Controller
									name={`subscribedEmails.${index}.emailFilters.${indexK}.value`}
									control={control}
									render={({ field, fieldState: { error } }) => (
										<Select {...field} labelId='suitability-id'>
											<MenuItem value='false'>Нет</MenuItem>
											<MenuItem value='true'>Да</MenuItem>
										</Select>
									)}
								/>
							</FormControl>
						) : operatorValueX === 'cost' ? (
							<TextField
								key='cost'
								{...register(`subscribedEmails.${index}.emailFilters.${indexK}.value`)}
								label={ColumnNames.COST}
								// error={Boolean(errors.subscribedEmails[index]?.emailFilters[indexK].value)}
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
