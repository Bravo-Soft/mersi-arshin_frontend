import { useGridApiContext } from '@mui/x-data-grid-pro';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';

import { useConvertColumns } from './useConvertColumns';
import { useFiltredSortedData } from './useFiltredSortedData';

import { dayjsFormatVariant } from 'constant/dateFormat';
import { Messages } from 'constant/messages';
import { useGetUserProfileQuery } from 'features/user/userApiSlice';
import type { IExcelConfig } from 'utils/excel';
import { createWorkbook } from 'utils/excel';
import { saveAs } from 'utils/saveAs';

interface IUseUploadHandlers {
	onCloseMenu: () => void;
}

export const useUploadHandlers = ({ onCloseMenu }: IUseUploadHandlers) => {
	const apiRef = useGridApiContext();

	/* Подготовка данных и колонок для них */
	const filteredData = useFiltredSortedData(apiRef);
	const columns = useConvertColumns(apiRef);

	const data = filteredData.map(({ suitability, ...data }) => ({
		...data,
		suitability: suitability ? 'Да' : 'Нет',
	}));

	const { data: userData } = useGetUserProfileQuery();

	const showHiddenMessage = () => {
		enqueueSnackbar(Messages.ALL_COLUMNS_IS_HIDDEN, { variant: 'warning' });
	};

	const exportDataAsCSV = () => {
		/* Если не открыто ни одной колонки, то показываем предупреждение */
		if (!columns.length) {
			return showHiddenMessage();
		}

		apiRef.current.exportDataAsCsv({
			delimiter: ';',
			utf8WithBom: true,
			fileName: `Файл от ${dayjs().format(dayjsFormatVariant)}`,
		});
	};

	const exportDataAsXLSX = async () => {
		/* Если не открыто ни одной колонки, то показываем предупреждение */
		if (!columns.length) {
			return showHiddenMessage();
		}

		/* Создаем полное ФИО */
		const userName = userData?.firstName
			? userData.firstName.concat(' ', userData?.lastName, ' ', userData?.patronymicName)
			: undefined;

		/* Собираем конфиг из нужных опций */
		const excelConfig: IExcelConfig = {
			userName,
			company: userData?.organization,
		};

		try {
			const workbook = createWorkbook(data, columns, excelConfig);

			/* Записываем книгу в буфер и передаем его в конструктор blob класса */
			const buffer = await workbook.xlsx.writeBuffer();
			const blob = new Blob([buffer], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			});

			/* Задаем название и сохраняем файл */
			const filename = `Книга от ${dayjs().format(dayjsFormatVariant)}.xlsx`;
			saveAs(blob, filename);
		} catch {
			enqueueSnackbar(Messages.FAILED_TO_SAVE_WORKBOOK, { variant: 'error' });
		}
	};

	/* Обработчики с готовыми функциями экспорта, работают в зависимости от статуса права в пакете */
	const handleUploadToCSV = () => {
		onCloseMenu();
		exportDataAsCSV();
	};

	const handleUploadToXLSX = async () => {
		onCloseMenu();
		await exportDataAsXLSX();
	};

	return { handleUploadToCSV, handleUploadToXLSX };
};
