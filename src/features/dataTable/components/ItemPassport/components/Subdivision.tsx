import { TableCell, Typography } from '@mui/material';

import StyledTableRow from 'styled/StyledTableRow';
import StyledTitleTableCell from 'styled/StyledTitleTableCell';

const data = [
	{
		divisionName: 'Южный участок службы подстанций',
		dates: {
			from: '01.03.2020',
			to: '01.01.2021',
		},
	},
	{
		divisionName: 'Северный участок диагностики',
		dates: {
			from: '01.01.2021',
			to: null,
		},
	},
	{
		divisionName: 'Западный участок диагностики',
		dates: {
			from: '01.01.2021',
			to: null,
		},
	},
];

export const Subdivision = ({ subdivision }: { subdivision: string[] }) => {
	return (
		<>
			<StyledTableRow>
				<StyledTitleTableCell colSpan={2} rowSpan={subdivision.length * 2} align='center'>
					Подразделение
				</StyledTitleTableCell>
			</StyledTableRow>

			{subdivision.map((row, idx) => (
				<StyledTableRow key={idx}>
					<TableCell colSpan={4} sx={{ border: '1px solid black' }}>
						<Typography variant='body2' sx={{ fontWeight: 'bold', color: '#014E5F' }}>
							{row}
						</Typography>
					</TableCell>
				</StyledTableRow>
			))}
		</>
	);
};
