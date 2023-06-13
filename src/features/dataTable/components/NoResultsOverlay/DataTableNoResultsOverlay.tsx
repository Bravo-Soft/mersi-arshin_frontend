import SearchOffIcon from '@mui/icons-material/SearchOff';
import Box from '@mui/material/Box';

import StyledGridOverlay from './StyledGridOverlay';

function DataTableNoResultsOverlay(): JSX.Element {
	return (
		<StyledGridOverlay>
			<SearchOffIcon />
			<Box mt={1} color='text.secondary'>
				Не удалось найти позиции по заданным фильтрам
			</Box>
		</StyledGridOverlay>
	);
}

export default DataTableNoResultsOverlay;
