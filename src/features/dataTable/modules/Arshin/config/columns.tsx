import { GridColDef, GridComparatorFn } from '@mui/x-data-grid-pro';

import { ArshinStatus } from 'constant/arshinStatus';
import { ColumnNames } from 'constant/columnsName';
import { RenderCellExpand } from 'features/dataTable/components/RenderCellExpand';
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
		field: 'organization',
		//sortable: false,
		headerName: ColumnNames.ORGANIZATION,
		width: 200,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
];
