import { TableCell } from '@mui/material';

import StyledTableRow from 'styled/StyledTableRow';

export const Divider = () => (
	<StyledTableRow>
		<TableCell
			colSpan={6}
			sx={{
				color: '#014E5F',
				fontWeight: 'bold',
				background: '#014E5F',
			}}
		/>
	</StyledTableRow>
);
