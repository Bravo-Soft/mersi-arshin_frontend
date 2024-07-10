import { Box, Tab, Tabs } from '@mui/material';
import { SyntheticEvent } from 'react';

interface ICustomPagination {
	sheets: string[];
	tab: number;
	handleChangeTab: (event: SyntheticEvent, newValue: number) => void;
}

export function CustomPagination({ sheets, tab, handleChangeTab }: ICustomPagination) {
	return (
		<Box
			sx={{
				bgcolor: 'background.paper',
				color: '#777',
				borderRadius: '0 0 8px 8px',
				borderTop: '1px solid #777',
			}}
		>
			<Tabs
				value={tab}
				onChange={handleChangeTab}
				variant='scrollable'
				scrollButtons='auto'
				aria-label='scrollable auto tabs example'
			>
				{sheets.map((sheet, index) => {
					return (
						<Tab
							key={index}
							label={sheet}
							sx={{
								textTransform: 'none',
							}}
						/>
					);
				})}
			</Tabs>
		</Box>
	);
}
