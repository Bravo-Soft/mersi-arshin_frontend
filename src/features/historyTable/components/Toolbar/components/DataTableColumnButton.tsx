import Tooltip from '@mui/material/Tooltip';
import { GridToolbarColumnsButton } from '@mui/x-data-grid/components';

function DataTableColumnButton(): JSX.Element {
	return (
		<Tooltip title='Настройки видимости столбцов'>
			<GridToolbarColumnsButton id='column-btn' />
		</Tooltip>
	);
}

export default DataTableColumnButton;
