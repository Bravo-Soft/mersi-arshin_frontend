import { useGridApiContext } from '@mui/x-data-grid-pro';
import { Messages } from 'constant/messages';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { useAppDispatch } from 'hooks/redux';
import { createWorkbook } from 'utils/excel';
import { saveAs } from 'utils/saveAs';

import type { IExcelConfig } from 'utils/excel';

import { formatVariant } from 'constant/dateFormat';
import { format } from 'date-fns';
import { showNotification } from 'features/notificator/notificatorSlice';
import { useGetUserProfileQuery } from 'features/user/userApiSlice';
import { useConvertColumns } from './useConvertColumns';
import { useFiltredSortedData } from './useFiltredSortedData';

interface IUseUploadHandlers {
	onCloseMenu: () => void;
	isXLSXEnabled?: boolean;
	isCSVEnabled?: boolean;
}

export const useUploadHandlers = ({
	isCSVEnabled,
	isXLSXEnabled,
	onCloseMenu,
}: IUseUploadHandlers) => {
	const dispatch = useAppDispatch();
	const apiRef = useGridApiContext();

	/* Подготовка данных и колонок для них */
	const data = useFiltredSortedData(apiRef);
	const columns = useConvertColumns(apiRef);

	const { data: userData } = useGetUserProfileQuery();

	const showPaymentDialog = () => {
		dispatch(
			changeSmartDialogState({
				variant: 'payment',
				isOpen: true,
				content: Messages.MODULE_IS_NOT_PAID,
			})
		);
	};

	const showHiddenMessage = () => {
		dispatch(
			showNotification({
				message: Messages.ALL_COLUMNS_IS_HIDDEN,
				type: 'warning',
			})
		);
	};

	const exportDataAsCSV = () => {
		/* Если не открыто ни одной колонки, то показываем предупреждение */
		if (!columns.length) {
			return showHiddenMessage();
		}

		apiRef.current.exportDataAsCsv({
			delimiter: ';',
			utf8WithBom: true,
			fileName: `Файл от ${format(new Date(), formatVariant)}`,
		});
	};

	const exportDataAsXLSX = async () => {
		/* Если не открыто ни одной колонки, то показываем предупреждение */
		if (!columns.length) {
			return showHiddenMessage();
		}

		/* Создаем полное ФИО */
		const userName = userData
			? userData.firstName.concat(' ', userData.lastName, ' ', userData.patronymicName)
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
			const filename = `Книга от ${format(new Date(), formatVariant)}.xlsx`;
			saveAs(blob, filename);
		} catch {
			dispatch(
				showNotification({
					message: Messages.FAILED_TO_SAVE_WORKBOOK,
					type: 'error',
				})
			);
		}
	};

	/* Обработчики с готовыми функциями экспорта, работают в зависимости от статуса права в пакете */
	const handleUploadToCSV = () => {
		onCloseMenu();
		isCSVEnabled ? exportDataAsCSV() : showPaymentDialog();
	};

	const handleUploadToXLSX = async () => {
		onCloseMenu();
		isXLSXEnabled ? await exportDataAsXLSX() : showPaymentDialog();
	};

	return { handleUploadToCSV, handleUploadToXLSX };
};
