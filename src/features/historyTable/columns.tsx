import type { GridCellParams, GridColDef } from '@mui/x-data-grid-pro';
import cn from 'classnames';

import { RenderCellExpand, RenderCellExpandedRegister } from './components/RenderCellExpand';
import { formatDateCallback } from './utils/formatDateCallback';
import { quickFilterDateFormat } from './utils/quickFilterDateFormat';

import { ColumnNames } from 'constant/columnsName';
import { Tag } from 'constant/tag';
import { IHistoryItem, ItemAction } from 'types/historyItem';

const initialWidth = 200;

const getCellClasses = ({ row, field }: GridCellParams<string>) => {
	const flagStatus = row.flags[field];

	if (row.action === 'Создание') {
		return cn({ cellCreated: true });
	}
	if (row.action === 'Удаление') {
		return cn({ cellRemoved: true });
	}
	return cn({
		cellUpdated: flagStatus === 'update',
	});
};

export const columns: GridColDef<IHistoryItem>[] = [
	{
		field: 'editedBy',
		headerName: ColumnNames.EDITED_BY,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'action',
		headerName: ColumnNames.ACTION,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		sortable: true,
		sortComparator: (v1: ItemAction, v2: ItemAction) => {
			const order = { Удаление: 1, Редактирование: 2, Создание: 3 };
			return order[v1] - order[v2];
		},
	},
	{
		field: 'modificationDate',
		headerName: ColumnNames.MODIFICATION_DATE,
		width: initialWidth,
		headerAlign: 'center',
		type: 'date',
		valueFormatter: formatDateCallback,
		getApplyQuickFilterFn: quickFilterDateFormat,
	},
	{
		field: 'name',
		headerName: ColumnNames.NAME,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
	{
		field: 'type',
		headerName: ColumnNames.TYPE,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
	{
		field: 'view',
		headerName: ColumnNames.VIEW,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
	{
		field: 'factoryNumber',
		headerName: ColumnNames.FACTORY_NUMBER,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
	{
		field: 'verificationControlInStateRegister',
		headerName: ColumnNames.VERIFICATION_CONTROL_STATE_REGISTER,
		width: initialWidth,
		type: 'boolean',
		headerAlign: 'center',
		renderCell: RenderCellExpandedRegister,
		cellClassName: getCellClasses,
	},
	{
		field: 'inventoryNumber',
		headerName: ColumnNames.INVENTORY_NUMBER,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
	{
		field: 'division',
		headerName: ColumnNames.DIVISION,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
	{
		field: 'location',
		headerName: ColumnNames.LOCATION,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
	{
		field: 'responsible',
		headerName: ColumnNames.RESPONSIBLE,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
	{
		field: 'verificationDate',
		headerName: ColumnNames.VERIFICATION_DATE,
		width: initialWidth,
		resizable: false,
		headerAlign: 'center',
		type: 'date',
		valueFormatter: formatDateCallback,
		getApplyQuickFilterFn: quickFilterDateFormat,
		cellClassName: getCellClasses,
	},
	{
		field: 'interVerificationInterval',
		headerName: ColumnNames.VERIFICATION_INTERVAL,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		valueGetter: params => `${params.value}`,
		cellClassName: getCellClasses,
	},
	{
		field: 'dateOfTheNextVerification',
		headerName: ColumnNames.DATE_OF_THE_NEXT_VERIFICATION,
		width: initialWidth,
		resizable: false,
		headerAlign: 'center',
		type: 'date',
		valueFormatter: formatDateCallback,
		cellClassName: getCellClasses,
		getApplyQuickFilterFn: quickFilterDateFormat,
	},
	{
		field: 'typeOfWork',
		headerName: ColumnNames.TYPE_OF_WORK,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
	{
		field: 'suitability',
		headerName: ColumnNames.SUITABILITY,
		width: initialWidth,
		headerAlign: 'center',
		type: 'singleSelect',
		valueFormatter: params => (params.value ? 'Да' : 'Нет'),
		renderCell: params => (params.value ? 'Да' : 'Нет'),
		valueOptions: [
			{ label: 'Да', value: true },
			{ label: 'Нет', value: false },
		],
		cellClassName: getCellClasses,
	},
	{
		field: 'condition',
		headerName: ColumnNames.CONDITION,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
	{
		field: 'stateRegister',
		headerName: ColumnNames.STATE_REGISTER,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
	{
		field: 'fgisUrl',
		headerName: ColumnNames.FGIS_URL,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
	{
		field: 'certificate',
		headerName: ColumnNames.CERTIFICATE,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
	{
		field: 'productionDate',
		headerName: ColumnNames.PRODUCTION_DATE,
		width: initialWidth,
		resizable: false,
		headerAlign: 'center',
		type: 'date',
		valueFormatter: formatDateCallback,
		getApplyQuickFilterFn: quickFilterDateFormat,
		cellClassName: getCellClasses,
	},
	{
		field: 'organization',
		headerName: ColumnNames.ORGANIZATION,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
	{
		field: 'accuracyClass',
		headerName: ColumnNames.ACCURACY_CLASS,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
	{
		field: 'measurementLimit',
		headerName: ColumnNames.MEASUREMENT_LIMIT,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
	{
		field: 'additionalData',
		headerName: ColumnNames.ADDITIONAL_DATA,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
	{
		field: 'size',
		headerName: ColumnNames.SIZE,
		width: initialWidth,
		headerAlign: 'center',
		type: 'singleSelect',
		valueOptions: [Tag.SMALL, Tag.MEDIUM, Tag.LARGE],
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
	{
		field: 'methodology',
		headerName: ColumnNames.METHODOLOGY,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
	{
		field: 'cost',
		headerName: ColumnNames.COST,
		width: initialWidth,
		headerAlign: 'center',
		type: 'number',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},

	{
		field: 'notes',
		headerName: ColumnNames.NOTES,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
		cellClassName: getCellClasses,
	},
];

export default columns;
