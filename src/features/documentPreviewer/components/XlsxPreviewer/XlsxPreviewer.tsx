import { LinearProgress } from '@mui/material';
import { type GridColDef, DataGridPro, GridRowsProp } from '@mui/x-data-grid-pro';
import { useSnackbar } from 'notistack';
import { type SyntheticEvent, useEffect, useState } from 'react';
import { read } from 'xlsx';

import { CustomFooter } from './components/CustomFooter';
import { CustomPagination } from './components/CustomPagination';
import { convertWsToMuiDataGrid } from './utils/convertWsToMuiDataGrid';
import RootDataGrid from './utils/rootDataGrid';

import { Messages } from 'constant/messages';
import { ErrorOverlay } from 'features/dataTable/components/ErrorOverlay';
import { NoResultsOverlay } from 'features/dataTable/components/NoResultsOverlay';
import { NoRowsOverlay } from 'features/dataTable/components/NoRowsOverlay';
import {
	selectIsPreviewerFailed,
	setPreviewerIsFailed,
} from 'features/documentPreviewer/documentPreviewerSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

type Row = GridRowsProp[];

interface IXlsxViewer {
	url: string;
}

export function XlsxViewer({ url }: IXlsxViewer) {
	const [arrayBuffer, setArrayBuffer] = useState<ArrayBuffer | null>(null);
	const [sheets, setSheets] = useState<string[]>([]);
	const [rows, setRows] = useState<Row[][]>([]);
	const [columns, setColumns] = useState<GridColDef[][]>([]);
	const [tab, setTab] = useState(0);

	const previewerIsFailed = useAppSelector(selectIsPreviewerFailed);

	const handleChangeTab = (_: SyntheticEvent, newValue: number): void => {
		setTab(newValue);
	};

	const { enqueueSnackbar } = useSnackbar();

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setPreviewerIsFailed(false));
		fetch(url)
			.then(res => res.arrayBuffer())
			.then(arrayBuffer => setArrayBuffer(arrayBuffer))
			.catch(() => enqueueSnackbar(Messages.ERROR_REPEAT, { variant: 'error' }));
	}, [enqueueSnackbar, url, dispatch]);

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
				dispatch(setPreviewerIsFailed(true));
			}
		};

		if (arrayBuffer) {
			renderXls();
		}
	}, [arrayBuffer, enqueueSnackbar, dispatch]);

	return (
		<RootDataGrid
			sidebarNear={false}
			style={{
				height: '100%',
				width: '100%',
				borderRadius: '0 0 8px 8px',
				backgroundColor: '#777',
			}}
		>
			{previewerIsFailed ? (
				<ErrorOverlay errorType='readError' />
			) : (
				rows.length > 0 &&
				columns.length > 0 && (
					<DataGridPro
						rowHeight={38}
						headerHeight={38}
						rows={rows[tab]}
						columns={columns[tab]}
						pagination
						disableColumnMenu
						disableSelectionOnClick
						components={{
							LoadingOverlay: LinearProgress,
							NoResultsOverlay,
							NoRowsOverlay,
							Footer: CustomFooter,
							Pagination: () =>
								CustomPagination({
									sheets,
									tab,
									handleChangeTab,
								}),
						}}
					/>
				)
			)}
		</RootDataGrid>
	);
}
