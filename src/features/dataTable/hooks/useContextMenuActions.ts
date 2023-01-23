import { formatVariant } from 'constant/dateFormat';
import { Messages } from 'constant/messages';
import { format, parseISO } from 'date-fns';
import { showNotification } from 'features/notificator/notificatorSlice';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { isValueDefined } from 'guards/isValueDefined';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';
import { useState } from 'react';
import { getArrayWithoutDuplicates } from 'utils/getArrayWithoutDuplicates';
import {
	pinManyRows,
	pinSelectedRow,
	resetSelectedModel,
	selectSelectedDataItem,
	selectSelectionModel,
	setSelectedDataItem,
	unpinManyRows,
	unPinRow,
} from '../dataTableSlice';
import {
	useCreateNewListFavoriteIdsMutation,
	useDeleteFavoriteIdsMutation,
} from '../favoritesApiSlice';

import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import type { MouseEvent } from 'react';
import type { IDataItem } from 'types/dataItem';
import type { ColumnNames } from '../columns';
import type { GridStateColDef } from '@mui/x-data-grid-pro';

export interface ICoordinates {
	mouseX: number;
	mouseY: number;
}

export type UseContextMenuActionsReturned = ReturnType<typeof useContextMenuActions>;

/**
 * Хук, возвращающий состояние контекстного меню и функции обработчики
 */
export const useContextMenuActions = (
	apiRef: React.MutableRefObject<GridApiPro>,
	data: IDataItem[]
) => {
	const dispatch = useAppDispatch();

	/* Состояние и селекторы */
	const [contextMenu, setContextMenu] = useState<ICoordinates | null>(null);
	const selectedDataItem = useAppSelector(selectSelectedDataItem);
	const selectionModel = useAppSelector(selectSelectionModel);

	/* Методы взаимодействия с сервером */
	const [sendNewFavoriteList] = useCreateNewListFavoriteIdsMutation();
	const [deleteFromFavorite] = useDeleteFavoriteIdsMutation();

	const { openSidebarWith } = useSidebarAction('home');

	/* Обработчики */
	const handleOpenContextMenu = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		const currentId = event.currentTarget.getAttribute('data-id');
		if (currentId !== null) {
			const findedDataItem = data.find(({ id }) => id === currentId);
			if (isValueDefined(findedDataItem)) {
				dispatch(setSelectedDataItem(findedDataItem));
				setContextMenu(
					contextMenu === null
						? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
						: null
				);
			}
		}
	};

	const handleClose = () => {
		setContextMenu(null);
	};

	const handleOpenEditDataItem = () => {
		openSidebarWith('EditDataItem');
		handleClose();
	};

	const handleOpenVerificateDataItem = () => {
		openSidebarWith('VerificateDataItem');
		handleClose();
	};

	const handleOpenFilesOfDataItem = () => {
		openSidebarWith('FilesDataItem');
		handleClose();
	};

	const handlePinningRow = () => {
		handleClose();
		selectedDataItem && dispatch(pinSelectedRow(selectedDataItem.id));
	};

	const handlePinningManyRows = () => {
		handleClose();
		dispatch(
			pinManyRows(
				isValueDefined(selectedDataItem)
					? getArrayWithoutDuplicates(...selectionModel, selectedDataItem.id)
					: selectionModel
			)
		);
		dispatch(resetSelectedModel());
	};

	const handleUnPinningRow = () => {
		handleClose();
		selectedDataItem && dispatch(unPinRow(selectedDataItem.id));
	};

	const handleUnPinningManyRows = () => {
		handleClose();
		dispatch(unpinManyRows());
	};

	const handleOpenDeleteDialog = () => {
		handleClose();
		dispatch(
			changeSmartDialogState({
				variant: 'deleting',
				isOpen: true,
			})
		);
	};

	const handleAddToFavorite = async () => {
		if (isValueDefined(selectedDataItem)) {
			try {
				await sendNewFavoriteList(
					getArrayWithoutDuplicates(...selectionModel, selectedDataItem.id)
				);
			} catch {
				dispatch(
					showNotification({
						message: Messages.FAILED_ADDED_TO_FAVORITE,
						type: 'error',
					})
				);
			} finally {
				dispatch(resetSelectedModel());
			}
		}
	};

	const handleRemoveFromFavorite = async () => {
		if (isValueDefined(selectedDataItem)) {
			try {
				await deleteFromFavorite(
					getArrayWithoutDuplicates(...selectionModel, selectedDataItem.id)
				);
			} catch {
				dispatch(
					showNotification({
						message: Messages.FAILED_TO_DELETE_FROM_FAVORITE,
						type: 'error',
					})
				);
			} finally {
				dispatch(resetSelectedModel());
			}
		}
	};

	const handleCopySelectedValues = async () => {
		if (navigator.clipboard) {
			if (isValueDefined(selectedDataItem)) {
				const dataWithConvertedDates = data
					.map((item: IDataItem) => ({
						...item,
						productionDate: format(parseISO(item.productionDate), formatVariant),
						verificationDate: format(parseISO(item.verificationDate), formatVariant),
						dateOfTheNextVerification: format(
							parseISO(item.dateOfTheNextVerification),
							formatVariant
						),
					}))
					.filter((item: IDataItem) =>
						[...selectionModel, selectedDataItem].includes(item.id)
					);

				const readableData = convertDataToReadableFormat(
					apiRef.current.getVisibleColumns(),
					dataWithConvertedDates
				);

				try {
					await navigator.clipboard.writeText(readableData);
					dispatch(
						showNotification({
							message: Messages.DATA_COPY_TO_CLIPBOARD,
							type: 'info',
						})
					);
				} catch {
					dispatch(
						showNotification({
							message: Messages.FAILED_COPY_DATA_TO_CLIPBOARD,
							type: 'error',
						})
					);
				}
			}
		} else {
			dispatch(
				showNotification({
					message: Messages.YOUR_BROWSER_DONT_SUPPLY_THIS_FUNCTION,
					type: 'warning',
				})
			);
		}
	};

	return {
		contextMenu,
		actionsOfContextMenu: {
			handleClose,
			handleOpenContextMenu,
			handleOpenEditDataItem,
			handleOpenVerificateDataItem,
			handleOpenFilesOfDataItem,
			handleOpenDeleteDialog,
			handlePinningRow,
			handlePinningManyRows,
			handleUnPinningRow,
			handleUnPinningManyRows,
			handleAddToFavorite,
			handleRemoveFromFavorite,
			handleCopySelectedValues,
		},
	};
};

interface IVisibleField {
	field: keyof IDataItem;
	headerName: ColumnNames;
}

/**
 *	Метод преобразующий массив объектов в одну строку, в человекочитаемом формате
 * @param visibleColumns колонки, получаемые из метода `apiRef.current.getVisibleColumns`
 * @param data массив данных, которые необходимо скопировать
 * @return итоговая строка, со всеми данными
 */
export const convertDataToReadableFormat = (
	visibleColumns: GridStateColDef<any, any, any>[],
	data: IDataItem[]
) => {
	const columnsWithoutCheckboxes = visibleColumns
		.filter(item => item.field !== '__check__')
		.map(
			({ field, headerName }) =>
				({
					field,
					headerName,
				} as IVisibleField)
		);

	/* Здесь мы используем метод join для того, чтобы избавиться от вывода матрицы и сразу преобразовать результат в строку */
	const convertRowToReadbleState = (item: IDataItem) =>
		columnsWithoutCheckboxes
			.map(({ field, headerName }) =>
				field in item ? `${headerName}: ${item[field] ?? 'Нет данных'}` : ''
			)
			.join('\r\n');

	return data.map(convertRowToReadbleState).join('\r\n\n'); // делаем отступ от каждой скопированной позиции
};
