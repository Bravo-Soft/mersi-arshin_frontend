import { type GridColDef, GridRowsProp } from '@mui/x-data-grid-pro';
import { SyntheticEvent, useEffect, useState } from 'react';
import { read } from 'xlsx';

import { convertWsToMuiDataGrid } from '../utils/convertWsToMuiDataGrid';

type Row = GridRowsProp[];

interface IXlsProps {
	type: string;
	arrayBuffer: ArrayBuffer | null;
}

export const useRenderXls = ({ type, arrayBuffer }: IXlsProps) => {
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
				const options = type === 'csv' ? { codepage: 65001 } : {};
				const wb = read(arrayBuffer, options);
				const sheetNames = wb.SheetNames;
				setSheets(sheetNames);

				for (let i = 0; i < sheetNames.length; i++) {
					const ws = wb.Sheets[wb.SheetNames[i]];
					const { rows, columns } = convertWsToMuiDataGrid(ws);

					if (i === 0) {
						setRows([rows]);
						setColumns([columns]);
					} else {
						setRows(prevState => [...prevState, rows]);
						setColumns(prevState => [...prevState, columns]);
					}
				}
			} catch (e) {
				return;
			}
		};

		if (arrayBuffer) {
			renderXls();
		}
	}, [arrayBuffer, type]);

	return { sheets, rows, columns, tab, handleChangeTab };
};
