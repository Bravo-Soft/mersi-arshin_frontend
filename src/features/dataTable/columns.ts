import type { GridCellParams, GridColDef } from '@mui/x-data-grid-pro';
import cn from 'classnames';
import dayjs from 'dayjs';

import { RenderCellExpand, RenderCellExpandedRegister } from './components/RenderCellExpand';
import { formatDateCallback } from './utils/formatDateCallback';
import { quickFilterDateFormat } from './utils/quickFilterDateFormat';

import { ColumnNames } from 'constant/columnsName';
import { Tag } from 'constant/tag';
import type { IDataItem } from 'types/dataItem';

const initialWidth = 200;

const getCellClasses = ({ value = '' }: GridCellParams<string>) => {
	//TODO: При необходимости включить стили для ячеек, срок поверки которых меньше 2 недель
	return cn({
		overdueItem: Boolean(!dayjs().isBefore(dayjs(value))),
		// twoWeeksToGo: result <= 14 && result >= 0,
	});
};

export const columns: GridColDef<IDataItem>[] = [
	{
		field: 'name',
		headerName: ColumnNames.NAME,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'type',
		headerName: ColumnNames.TYPE,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'factoryNumber',
		headerName: ColumnNames.FACTORY_NUMBER,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'verificationControlInStateRegister',
		headerName: ColumnNames.VERIFICATION_CONTROL_STATE_REGISTER,
		width: initialWidth,
		type: 'boolean',
		headerAlign: 'center',
		renderCell: RenderCellExpandedRegister,
	},
	{
		field: 'inventoryNumber',
		headerName: ColumnNames.INVENTORY_NUMBER,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'division',
		headerName: ColumnNames.DIVISION,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'location',
		headerName: ColumnNames.LOCATION,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'responsible',
		headerName: ColumnNames.RESPONSIBLE,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
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
	},
	{
		field: 'interVerificationInterval',
		headerName: ColumnNames.VERIFICATION_INTERVAL,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
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
	},
	{
		field: 'suitability',
		headerName: ColumnNames.SUITABILITY,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'condition',
		headerName: ColumnNames.CONDITION,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'stateRegister',
		headerName: ColumnNames.STATE_REGISTER,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'fgisUrl',
		headerName: ColumnNames.FGIS_URL,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'certificate',
		headerName: ColumnNames.CERTIFICATE,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
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
	},
	{
		field: 'organization',
		headerName: ColumnNames.ORGANIZATION,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'accuracyClass',
		headerName: ColumnNames.ACCURACY_CLASS,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'measurementLimit',
		headerName: ColumnNames.MEASUREMENT_LIMIT,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'additionalData',
		headerName: ColumnNames.ADDITIONAL_DATA,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'size',
		headerName: ColumnNames.SIZE,
		width: initialWidth,
		headerAlign: 'center',
		type: 'singleSelect',
		valueOptions: [Tag.SMALL, Tag.MEDIUM, Tag.LARGE],
		renderCell: RenderCellExpand,
	},
	{
		field: 'methodology',
		headerName: ColumnNames.METHODOLOGY,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'cost',
		headerName: ColumnNames.COST,
		width: initialWidth,
		headerAlign: 'center',
		type: 'number',
		renderCell: RenderCellExpand,
	},

	{
		field: 'notes',
		headerName: ColumnNames.NOTES,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
];

export default columns;
