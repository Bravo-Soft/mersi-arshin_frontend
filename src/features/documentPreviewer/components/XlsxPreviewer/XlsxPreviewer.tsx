import { LinearProgress } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';

import { CustomFooter } from './components/CustomFooter';
import { CustomPagination } from './components/CustomPagination';
import { useRenderXls } from './hooks/useRenderXls';
import RootDataGrid from './utils/rootDataGrid';

import { ErrorOverlay } from 'features/dataTable/components/ErrorOverlay';
import { NoResultsOverlay } from 'features/dataTable/components/NoResultsOverlay';
import { NoRowsOverlay } from 'features/dataTable/components/NoRowsOverlay';
import { useFileValidation } from 'hooks/useFileValidation';

interface IXlsxViewer {
	url: string;
}

export function XlsxViewer({ url }: IXlsxViewer) {
	const { fileStatus, arrayBuffer } = useFileValidation(url);
	const { sheets, rows, columns, tab, handleChangeTab } = useRenderXls(arrayBuffer);

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
			{fileStatus.isCorrupt ? (
				<ErrorOverlay errorType='readError' />
			) : fileStatus.isEmpty ? (
				<ErrorOverlay errorType='emptyFile' />
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
