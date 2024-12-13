import { TableCell, Typography } from '@mui/material';

import StyledTableRow from 'styled/StyledTableRow';
import StyledTitleTableCell from 'styled/StyledTitleTableCell';

export const Organization = ({ organization }: { organization: string }): JSX.Element => {
	return (
		<StyledTableRow>
			<StyledTitleTableCell colSpan={2}>Организация</StyledTitleTableCell>
			<TableCell colSpan={4}>
				<Typography variant='body2'>{organization}</Typography>
			</TableCell>
		</StyledTableRow>
	);
};
