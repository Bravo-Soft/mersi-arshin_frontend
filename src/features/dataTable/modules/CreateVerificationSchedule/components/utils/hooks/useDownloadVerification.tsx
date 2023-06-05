import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns';
import { GridLinkOperator, gridFilterModelSelector } from '@mui/x-data-grid-pro';
import { updateData } from '../../../utils/updateData';
import { createWorkbook } from 'utils/excel';
import { saveAs } from 'utils/saveAs';
import { formatVariant } from 'constant/dateFormat';
import { createDateRange } from '../helpers';
import { useAppDispatch } from 'hooks/redux';
import { setVerificationScheduleModal } from 'features/dataTable/dataTableSlice';

import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import type { MutableRefObject } from 'react';
import type { IForm } from '../../../operatorsFilters';

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
		} catch (error) {
			throw error;
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
