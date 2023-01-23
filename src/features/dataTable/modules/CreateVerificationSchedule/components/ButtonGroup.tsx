import { GridLinkOperator } from '@mui/x-data-grid-pro';
import { formatVariant } from 'constant/dateFormat';
import { format } from 'date-fns';
import { setVerificationScheduleModal } from 'features/dataTable/dataTableSlice';
import { useAppDispatch } from 'hooks/redux';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { createWorkbook } from 'utils/excel';
import { saveAs } from 'utils/saveAs';
import { updateData } from '../utils/updateData';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import type { GridFilterItem } from '@mui/x-data-grid-pro';
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import type { DateRange } from '@mui/x-date-pickers-pro';
import type { MutableRefObject } from 'react';
import type { IForm } from '../operatorsFilters';

interface IButtonGroupProps {
	apiRef: MutableRefObject<GridApiPro>;
	dateRange: DateRange<Date>;
}

function ButtonGroup({ apiRef, dateRange }: IButtonGroupProps) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	let filters: GridFilterItem[];

	const dispatch = useAppDispatch();

	const { getValues } = useFormContext<IForm>();

	const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const closeModal = () => {
		dispatch(setVerificationScheduleModal(false));
	};

	const setFilters = () => {
		const additionalFilters = getValues().filters;
		filters = apiRef.current.state.filter.filterModel.items;
		apiRef.current.setFilterModel({
			items: [
				{
					columnField: 'dateOfTheNextVerification',
					operatorValue: 'onOrAfter',
					id: 1,
					value: format(dateRange[0] as Date, 'yyyy-MM-dd'),
				},
				{
					columnField: 'dateOfTheNextVerification',
					operatorValue: 'onOrBefore',
					id: 2,
					value: format(dateRange[1] as Date, 'yyyy-MM-dd'),
				},
				...additionalFilters,
			],
			linkOperator: GridLinkOperator.And,
		});
	};

	const donwloadDataExcel = async () => {
		try {
			const columns = apiRef.current
				.getVisibleColumns()
				.filter(el => el.field !== '__check__')
				.map(el => ({ key: el.field, header: el.headerName! }));

			setFilters();

			const data = Array.from(apiRef.current.getVisibleRowModels());

			const newData = updateData(data, apiRef);

			const workbook = createWorkbook(newData, columns);

			apiRef.current.upsertFilterItems(filters);

			const buffer = await workbook.xlsx.writeBuffer();
			const blob = new Blob([buffer], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			});

			const filename = `Книга от ${format(new Date(), formatVariant)}.xlsx`;
			saveAs(blob, filename);
		} catch (error) {
			throw error;
		} finally {
			closeModal();
		}
	};

	const donwloadDataCSV = () => {
		setFilters();
		apiRef.current.exportDataAsCsv({ delimiter: ';', utf8WithBom: true });
		apiRef.current.upsertFilterItems(filters);
		closeModal();
	};

	return (
		<>
			<Box>
				<Button
					id='basic-button'
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}
					onClick={handleOpenMenu}
				>
					Выгрузить
				</Button>
				<Menu
					id='basic-menu'
					anchorEl={anchorEl}
					open={open}
					onClose={handleCloseMenu}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
				>
					<MenuItem onClick={donwloadDataCSV}>Выгрузить в CSV</MenuItem>
					<MenuItem onClick={donwloadDataExcel}>Выгрузить в XLSX</MenuItem>
				</Menu>
			</Box>
			<Button onClick={closeModal}>Закрыть</Button>
		</>
	);
}

export default ButtonGroup;
