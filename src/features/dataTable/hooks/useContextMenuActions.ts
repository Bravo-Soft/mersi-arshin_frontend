import type { GridStateColDef } from '@mui/x-data-grid-pro';
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import { format, parseISO } from 'date-fns';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import type { MouseEvent } from 'react';

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

import type { ColumnNames } from 'constant/columnsName';
import { formatVariant } from 'constant/dateFormat';
import { Messages } from 'constant/messages';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { isValueDefined } from 'guards/isValueDefined';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';
import type { IDataItem } from 'types/dataItem';
import { getArrayWithoutDuplicates } from 'utils/getArrayWithoutDuplicates';

export interface ICoordinates {
	mouseX: number;
	mouseY: number;
}

type CopyData = Omit<IDataItem, 'userIds' | 'documents'>;

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
			const fondedDataItem = data.find(({ id }) => id === currentId);
			if (isValueDefined(fondedDataItem)) {
				dispatch(setSelectedDataItem(fondedDataItem));
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

	const handleOpenVerificationDataItem = () => {
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
				enqueueSnackbar(Messages.FAILED_ADDED_TO_FAVORITE, { variant: 'error' });
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
				enqueueSnackbar(Messages.FAILED_TO_DELETE_FROM_FAVORITE, { variant: 'error' });
			} finally {
				dispatch(resetSelectedModel());
			}
		}
	};

	const handleCopySelectedValues = async () => {
		if (navigator.clipboard) {
			if (isValueDefined(selectedDataItem)) {
				const dataWithConvertedDates = data
					.map(
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						({ userIds, documents, ...item }: IDataItem): CopyData => ({
							...item,
							productionDate: format(parseISO(item.productionDate), formatVariant),
							verificationDate: format(parseISO(item.verificationDate), formatVariant),
							dateOfTheNextVerification: format(
								parseISO(item.dateOfTheNextVerification),
								formatVariant
							),
						})
					)
					.filter((item: CopyData) =>
						[...selectionModel, selectedDataItem.id].includes(item.id)
					);

				const readableData = convertDataToReadableFormat(
					apiRef.current.getVisibleColumns(),
					dataWithConvertedDates
				);

				try {
					await navigator.clipboard.writeText(readableData);
					enqueueSnackbar(Messages.DATA_COPY_TO_CLIPBOARD, { variant: 'info' });
				} catch {
					enqueueSnackbar(Messages.FAILED_COPY_DATA_TO_CLIPBOARD, { variant: 'error' });
				}
			}
		} else {
			enqueueSnackbar(Messages.YOUR_BROWSER_DONT_SUPPLY_THIS_FUNCTION, { variant: 'warning' });
		}
	};

	const handleAddToArshin = () => {
		console.log('добавить в аршин');
	};

	return {
		contextMenu,
		actionsOfContextMenu: {
			handleClose,
			handleOpenContextMenu,
			handleOpenEditDataItem,
			handleOpenVerificationDataItem,
			handleOpenFilesOfDataItem,
			handleOpenDeleteDialog,
			handlePinningRow,
			handlePinningManyRows,
			handleUnPinningRow,
			handleUnPinningManyRows,
			handleAddToFavorite,
			handleRemoveFromFavorite,
			handleCopySelectedValues,
			handleAddToArshin,
		},
	};
};

interface IVisibleField {
	field: keyof CopyData;
	headerName: ColumnNames;
}

/**
 *	Метод преобразующий массив объектов в одну строку, в человеко-читаемом формате
 * @param visibleColumns колонки, получаемые из метода `apiRef.current.getVisibleColumns`
 * @param data массив данных, которые необходимо скопировать
 * @return итоговая строка, со всеми данными
 */
export const convertDataToReadableFormat = (
	visibleColumns: GridStateColDef[],
	data: CopyData[]
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
	const convertRowToReadableState = (item: CopyData) =>
		columnsWithoutCheckboxes
			.map(({ field, headerName }) =>
				field in item ? `${headerName}: ${item[field] ?? 'Нет данных'}` : ''
			)
			.join('\r\n');

	return data.map(convertRowToReadableState).join('\r\n\n'); // делаем отступ от каждой скопированной позиции
};
