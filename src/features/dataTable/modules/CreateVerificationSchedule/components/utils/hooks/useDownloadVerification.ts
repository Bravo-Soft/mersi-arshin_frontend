import { gridFilterModelSelector, GridLinkOperator } from '@mui/x-data-grid-pro';
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';
import type { MutableRefObject } from 'react';
import { useFormContext } from 'react-hook-form';

import { createDateRange } from '../helpers';

import { dayjsFormatVariant } from 'constant/dateFormat';
import { fileType } from 'constant/fileType';
import { setVerificationScheduleModal } from 'features/dataTable/dataTableSlice';
import type { IForm } from 'features/dataTable/modules/CreateVerificationSchedule/operatorsFilters';
import { updateData } from 'features/dataTable/modules/CreateVerificationSchedule/utils/updateData';
import { useAppDispatch } from 'hooks/redux';
import { saveAs } from 'utils/saveAs';

/**
 * @package хук для выгрузки данных
 * @function downloadDataExcel => функция выгрузки в Excel
 * @function downloadDataCSV => функция выгрузки в CSV
 * @function closeModal => функция закрытия окна создания графика
 * @returns возвращает [closeModal , downloadDataExcel , downloadDataCSV ]
 */

export const useDownloadVerification = (apiRef: MutableRefObject<GridApiPro>) => {
	const { watch } = useFormContext<IForm>();
	const filters = gridFilterModelSelector(apiRef);

	const { fieldsDate, filters: formFilters } = watch();

	const dispatch = useAppDispatch();

	const closeModal = () => {
		dispatch(setVerificationScheduleModal(false));
	};

	const setFilters = () => {
		const [first, second] = fieldsDate;
		const firstDate = first ? new Date(first.format()) : first;
		const secondDate = second ? new Date(second.format()) : second;

		const newFiltersDate: DateRange<Date> = [firstDate, secondDate];

		apiRef.current.setFilterModel({
			items: [...createDateRange(newFiltersDate), ...formFilters],
			linkOperator: GridLinkOperator.And,
		});
	};

	const downloadDataExcel = async () => {
		try {
			const columns = apiRef.current
				.getVisibleColumns()
				.filter(el => el.field !== '__check__')
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				.map(el => ({ key: el.field, header: el.headerName! }));

			setFilters();
			const data = Array.from(apiRef.current.getVisibleRowModels());

			const newData = updateData(data, apiRef);

			const createWorkbook = await import("utils/excel").then(m => m.createWorkbook);
			const workbook = createWorkbook(newData, columns);

			apiRef.current.setFilterModel(filters);


			const buffer = await workbook.xlsx.writeBuffer();
			const blob = new Blob([buffer], {
				type: fileType,
			});

			const filename = `Книга от ${dayjs().format(dayjsFormatVariant)}.xlsx`;
			saveAs(blob, filename);
		} finally {
			closeModal();
		}
	};

	const downloadDataCSV = () => {
		setFilters();
		apiRef.current.exportDataAsCsv({ delimiter: ';', utf8WithBom: true });
		apiRef.current.setFilterModel(filters);
		closeModal();
	};

	return { downloadDataCSV, downloadDataExcel, closeModal };
};
