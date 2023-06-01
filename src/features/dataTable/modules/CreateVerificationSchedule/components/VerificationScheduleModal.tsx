import { useEffect, useState } from 'react';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { operatorsFilters } from '../operatorsFilters';
import { setColumns } from '../utils/setColums';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
	selectedIsOpenedVerificationScheduleModal,
	setVerificationScheduleModal,
} from 'features/dataTable/dataTableSlice';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import BlockFilter from './BlockFilter';
import Typography from '@mui/material/Typography';
import ButtonGroup from './ButtonGroup';

import type { MutableRefObject } from 'react';
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import type { DateRange } from '@mui/x-date-pickers-pro';
import type { IForm, IColumnTable } from '../operatorsFilters';

interface IPopupVerificationScheduleModalProps {
	apiRef: MutableRefObject<GridApiPro>;
}

function VerificationScheduleModal({ apiRef }: IPopupVerificationScheduleModalProps): JSX.Element {
	const [dateRange, setDateRange] = useState<DateRange<Date>>([null, null]);
	const [columnsFilters, setColumnsFilters] = useState<IColumnTable[]>([]);
	const isOpenedModal = useAppSelector(selectedIsOpenedVerificationScheduleModal);
	const dispatch = useAppDispatch();

	const methods = useForm<IForm>();
	const { control } = methods;
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'filters',
		keyName: 'id',
	});

	useEffect(() => {
		const columns = setColumns(apiRef);

		setColumnsFilters(columns);
	}, [apiRef]);

	const addFilter = () => {
		append({
			columnField: columnsFilters[0].field,
			operatorValue: operatorsFilters.defaultFilters[0].operatorValue,
			id: Math.random(), // нужен только если мы используем множество фильтров
			value: '',
		});
	};

	const setDate = (newValue: DateRange<Date>) => {
		setDateRange(newValue);
	};

	const closeModal = () => {
		dispatch(setVerificationScheduleModal(false));
	};

	return (
		<Dialog open={isOpenedModal} onClose={closeModal}>
			<FormProvider {...methods}>
				<DialogTitle>Создание графика поверки</DialogTitle>
				<Box
					flexDirection='column'
					px={3.5}
					pb={3.5}
					rowGap={1}
					flexGrow={1}
					justifyContent='space-between'
				>
					<Typography sx={{ fontWeight: 500 }}>Выберите даты</Typography>
					<DateRangePicker
						value={dateRange}
						onChange={newValue => setDate(newValue)}
						slotProps={{
							fieldSeparator: { hidden: true },
							textField: { required: true },
						}}
						localeText={{ start: 'Начальная дата', end: 'Дата окончания' }}
					/>
				</Box>
				{fields.map((item, index) => (
					<BlockFilter
						key={item.id}
						columnsFilters={columnsFilters}
						index={index}
						remove={remove}
					/>
				))}

				<Button
					sx={{ width: 'fit-content', justifyContent: 'flex-start', ml: 3.5 }}
					type='button'
					onClick={addFilter}
				>
					+ Добавить фильтр
				</Button>
				<DialogActions>
					<ButtonGroup apiRef={apiRef} dateRange={dateRange} />
				</DialogActions>
			</FormProvider>
		</Dialog>
	);
}

export default VerificationScheduleModal;
