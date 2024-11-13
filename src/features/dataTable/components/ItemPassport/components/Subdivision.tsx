import { TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';

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
const dates = {
	from: '01.01.2021',
	to: null,
};

export const Subdivision = ({ subdivision }: { subdivision: string[] }) => {
	return (
		<>
			<StyledTableRow>
				<StyledTitleTableCell colSpan={2} rowSpan={subdivision.length * 2} align='center'>
					Подразделение
				</StyledTitleTableCell>
			</StyledTableRow>

			{subdivision.map((row, idx) => (
				<React.Fragment key={idx}>
					<StyledTableRow>
						<TableCell colSpan={4} sx={{ border: '1px solid black' }}>
							<Typography variant='body2' sx={{ fontWeight: 'bold', color: '#014E5F' }}>
								{row}
							</Typography>
						</TableCell>
						{/* <TableCell colSpan={2} rowSpan={2} sx={{ padding: '1px' }} /> */}
					</StyledTableRow>

					{/* <StyledTableRow>
						<TableCell colSpan={2} style={{ border: '1px dashed black', padding: '1px' }}>
							<Typography variant='body2' sx={{ color: '#014E5F' }}>
								с {dates.from} {dates.to && `до ${dates.to}`}
							</Typography>
						</TableCell>
					</StyledTableRow> */}
				</React.Fragment>
			))}
		</>
	);
};
