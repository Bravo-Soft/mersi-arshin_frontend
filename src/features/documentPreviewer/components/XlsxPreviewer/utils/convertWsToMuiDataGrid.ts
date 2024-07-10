import { type GridRowsProp, type GridColDef } from '@mui/x-data-grid-pro';
import { type WorkSheet, utils } from 'xlsx';

type Row = GridRowsProp[];
type RowCol = { rows: Row[]; columns: GridColDef[] };

export function convertWsToMuiDataGrid(ws: WorkSheet): RowCol {
	const rowsFromJson: Row[] = utils.sheet_to_json(ws, { header: 1 });
	const rows = rowsFromJson.map((row, index) => ({ ...row, id: index + 1 }));

	const range = utils.decode_range(ws['!ref'] || 'A1');
	const columnsData = Array.from({ length: range.e.c + 1 }, (_, i) => ({
		field: String(i),
		headerName: utils.encode_col(i),
		editable: false,
		minWidth: 50,
		flex: 1,
	}));
	const columns = [
		{
			field: 'id',
			headerName: '\u25E2',
			editable: false,
		},
		...columnsData,
	];

	return { rows, columns };
}
