import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import type { IForm } from '../operatorsFilters';
import { operatorsFilters } from '../operatorsFilters';

import BlockFilter from './BlockFilter';

import { columnsFilters } from 'components/Forms/NotificationSettings/data';
import { maxDate, minDate } from 'constant/dateMasks';
import { hideScrollbar } from 'utils/hideScrollbar';

function VerificationDialogContent() {
	const { control } = useFormContext<IForm>();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'filters',
		keyName: 'id',
	});

	const addFilter = () => {
		append({
			columnField: columnsFilters[0].field,
			operatorValue: operatorsFilters.defaultFilters[0].operatorValue,
			id: Math.random(), // нужен только если мы используем множество фильтров
			value: '',
		});
	};

	return (
		<DialogContent>
			<Controller
				control={control}
				name='fieldsDate'
				render={({ field: { value, onChange, ref }, formState: { errors } }) => (
					<DateRangePicker
						ref={ref}
						value={value}
						onChange={onChange}
						minDate={dayjs(minDate)}
						maxDate={dayjs(maxDate)}
						slotProps={{
							fieldSeparator: { hidden: true },
							textField: ({ position }) => {
								const error = errors.fieldsDate?.[position === 'start' ? 0 : 1];
								return {
									error: Boolean(error ?? errors.fieldsDate),
									helperText: error?.message ?? ' ',
								};
							},
						}}
						localeText={{ start: 'Начальная дата', end: 'Дата окончания' }}
					/>
				)}
			/>
			<Box mt={1}>
				<Box maxHeight='300px' overflow='auto' sx={hideScrollbar()}>
					{fields.map((item, index) => (
						<BlockFilter key={item.id} index={index} remove={remove} />
					))}
				</Box>
				<Button type='button' onClick={addFilter} startIcon={<AddIcon />}>
					Добавить фильтр
				</Button>
			</Box>
		</DialogContent>
	);
}

export default VerificationDialogContent;
