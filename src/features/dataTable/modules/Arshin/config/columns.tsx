import { GridColDef, GridComparatorFn } from '@mui/x-data-grid-pro';

import { ArshinStatus } from 'constant/arshinStatus';
import { ColumnNames } from 'constant/columnsName';
import { Tag } from 'constant/tag';
import {
	RenderCellExpand,
	RenderCellExpandedRegister,
} from 'features/dataTable/components/RenderCellExpand';
import { formatDateCallback } from 'features/dataTable/utils/formatDateCallback';
import { quickFilterDateFormat } from 'features/dataTable/utils/quickFilterDateFormat';
import { IDataItemArshin } from 'types/arshinIntegration';

const sortComparator: GridComparatorFn = (v1, v2, cellParams1, cellParams2) => {
	if (cellParams1.field === 'status' && cellParams2.field === 'status') {
		if (v1 === ArshinStatus.PROCESS) {
			return -1;
		} else if (v2 === ArshinStatus.PROCESS) {
			return 1;
		}
	}
	return v1.toString().localeCompare(v2, undefined, { numeric: true });
};

export const columnsArshin: GridColDef<IDataItemArshin>[] = [
	{
		field: 'verificationControlInStateRegister',
		disableColumnMenu: true,
		// sortable: false,
		headerName: '',
		width: 10,
		type: 'boolean',
		headerAlign: 'center',
		renderCell: RenderCellExpandedRegister,
	},
	{
		field: 'status',
		//sortable: false,
		headerName: ColumnNames.STATUS,
		width: 250,
		headerAlign: 'center',
		type: 'singleSelect',
		valueOptions: [
			ArshinStatus.DONE,
			ArshinStatus.FAILED_TO_RETRIEVE_DATA,
			ArshinStatus.AWAITING_SHIPMENT,
		],
		renderCell: RenderCellExpand,
		sortComparator: sortComparator,
	},
	{
		field: 'name',
		// sortable: false,
		headerName: ColumnNames.NAME,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'type',
		// sortable: false,
		headerName: ColumnNames.TYPE,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'factoryNumber',
		// sortable: false,
		headerName: ColumnNames.FACTORY_NUMBER,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},

	{
		field: 'inventoryNumber',
		hide: true,
		// sortable: false,
		headerName: ColumnNames.INVENTORY_NUMBER,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'division',
		hide: true,
		// sortable: false,
		headerName: ColumnNames.DIVISION,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},

	{
		field: 'location',
		hide: true,
		// sortable: false,
		headerName: ColumnNames.LOCATION,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'responsible',
		hide: true,
		// sortable: false,
		headerName: ColumnNames.RESPONSIBLE,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'verificationDate',
		// sortable: false,
		headerName: ColumnNames.VERIFICATION_DATE,
		width: 200,
		resizable: false,
		headerAlign: 'center',
		type: 'date',
		valueFormatter: formatDateCallback,
		getApplyQuickFilterFn: quickFilterDateFormat,
	},

	{
		field: 'interVerificationInterval',
		hide: true,
		// sortable: false,
		headerName: ColumnNames.VERIFICATION_INTERVAL,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'dateOfTheNextVerification',
		// sortable: false,
		headerName: ColumnNames.DATE_OF_THE_NEXT_VERIFICATION,
		width: 200,
		resizable: false,
		headerAlign: 'center',
		type: 'date',
		valueFormatter: formatDateCallback,
		getApplyQuickFilterFn: quickFilterDateFormat,
	},
	{
		field: 'typeOfWork',
		hide: true,
		// sortable: false,
		headerName: ColumnNames.TYPE_OF_WORK,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},

	{
		field: 'suitability',
		headerName: ColumnNames.SUITABILITY,
		width: 200,
		headerAlign: 'center',
		type: 'singleSelect',
		renderCell: params => (params.value ? 'Да' : 'Нет'),
		valueOptions: [
			{ label: 'Да', value: true },
			{ label: 'Нет', value: false },
		],
	},

	{
		field: 'condition',
		hide: true,
		// sortable: false,
		headerName: ColumnNames.CONDITION,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'stateRegister',
		hide: true,
		//sortable: false,
		headerName: ColumnNames.STATE_REGISTER,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'fgisUrl',
		//sortable: false,
		headerName: ColumnNames.FGIS_URL,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'certificate',
		//sortable: false,
		headerName: ColumnNames.CERTIFICATE,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'productionDate',
		hide: true,
		//sortable: false,
		headerName: ColumnNames.PRODUCTION_DATE,
		width: 200,
		resizable: false,
		headerAlign: 'center',
		type: 'date',
		valueFormatter: formatDateCallback,
	},
	{
		field: 'organization',
		//sortable: false,
		headerName: ColumnNames.ORGANIZATION,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'accuracyClass',
		hide: true,
		//sortable: false,
		headerName: ColumnNames.ACCURACY_CLASS,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'measurementLimit',
		hide: true,
		//sortable: false,
		headerName: ColumnNames.MEASUREMENT_LIMIT,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'additionalData',
		hide: true,
		//sortable: false,
		headerName: ColumnNames.ADDITIONAL_DATA,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'size',
		hide: true,
		//sortable: false,
		headerName: ColumnNames.SIZE,
		width: 200,
		headerAlign: 'center',
		type: 'singleSelect',
		valueOptions: [Tag.SMALL, Tag.MEDIUM, Tag.LARGE],
		renderCell: RenderCellExpand,
	},
	{
		field: 'methodology',
		hide: true,
		//sortable: false,
		headerName: ColumnNames.METHODOLOGY,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'cost',
		hide: true,
		//sortable: false,
		headerName: ColumnNames.COST,
		width: 200,
		headerAlign: 'center',
		type: 'number',
		renderCell: RenderCellExpand,
	},

	{
		field: 'notes',
		hide: true,
		//sortable: false,
		headerName: ColumnNames.NOTES,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
];
