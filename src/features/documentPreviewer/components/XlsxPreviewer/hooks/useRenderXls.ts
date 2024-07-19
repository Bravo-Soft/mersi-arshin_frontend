import { type GridColDef, GridRowsProp } from '@mui/x-data-grid-pro';
import { SyntheticEvent, useEffect, useState } from 'react';
import { read } from 'xlsx';

import { convertWsToMuiDataGrid } from '../utils/convertWsToMuiDataGrid';

type Row = GridRowsProp[];

export const useRenderXls = (arrayBuffer: ArrayBuffer | null) => {
	const [sheets, setSheets] = useState<string[]>([]);
	const [rows, setRows] = useState<Row[][]>([]);
	const [columns, setColumns] = useState<GridColDef[][]>([]);
	const [tab, setTab] = useState(0);

	const handleChangeTab = (_: SyntheticEvent, newValue: number): void => {
		setTab(newValue);
	};

	useEffect(() => {
		const renderXls = async () => {
			try {
				const wb = read(arrayBuffer);
				const sheetNames = wb.SheetNames;
				setSheets(sheetNames);

				for (let i = 0; i < sheetNames.length; i++) {
					const ws = wb.Sheets[wb.SheetNames[i]];
					const { rows, columns } = convertWsToMuiDataGrid(ws);
					setRows(prevState => [...prevState, rows]);
					setColumns(prevState => [...prevState, columns]);
				}
			} catch (e) {
				return;
			}
		};

		if (arrayBuffer) {
			renderXls();
		}
	}, [arrayBuffer]);

	return { sheets, rows, columns, tab, handleChangeTab };
};
