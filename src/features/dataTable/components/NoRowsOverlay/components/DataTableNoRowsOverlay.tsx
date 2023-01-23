import EmptyIcon from './EmptyIcon';

import Box from '@mui/material/Box';
import StyledGridOverlay from '../StyledGridOverlay';

function DataTableNoRowsOverlay(): JSX.Element {
	return (
		<StyledGridOverlay>
			<EmptyIcon />
			<Box mt={1} color='text.secondary'>
				Не добавленно ни одной позиции
			</Box>
		</StyledGridOverlay>
	);
}

export default DataTableNoRowsOverlay;
