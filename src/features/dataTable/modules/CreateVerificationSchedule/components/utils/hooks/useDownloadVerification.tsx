import { GridLinkOperator, gridFilterModelSelector } from '@mui/x-data-grid-pro';
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import { format } from 'date-fns';
import type { MutableRefObject } from 'react';
import { useFormContext } from 'react-hook-form';

import type { IForm } from '../../../operatorsFilters';
import { updateData } from '../../../utils/updateData';
import { createDateRange } from '../helpers';

import { formatVariant } from 'constant/dateFormat';
import { setVerificationScheduleModal } from 'features/dataTable/dataTableSlice';
import { useAppDispatch } from 'hooks/redux';
import { createWorkbook } from 'utils/excel';
import { saveAs } from 'utils/saveAs';

/**
 * @package хук для выгрузки данных
 * @function setFilters => функция принимает в себя фильтры из дейтпикера и набора кастомных фильтров и вносит их в модель фильтрации таблицы
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
		apiRef.current.setFilterModel({
			items: [...createDateRange(fieldsDate), ...formFilters],
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

			const workbook = createWorkbook(newData, columns);

			apiRef.current.setFilterModel(filters);

			const buffer = await workbook.xlsx.writeBuffer();
			const blob = new Blob([buffer], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			});

			const filename = `Книга от ${format(new Date(), formatVariant)}.xlsx`;
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
