import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';

import { months } from './toolBarFilters';
import type { ChipFilterOptions } from './toolBarFilters';

import StyledChip from 'features/dataTable/styled/StyledChip';

export interface IMonthsChipsProps {
	isExpanded: boolean;
	handleSelectChipFilterOption: (newOption: ChipFilterOptions) => () => void;
	currentBadgeContent: string | false;
}

function MonthsChips({
	isExpanded,
	handleSelectChipFilterOption,
	currentBadgeContent,
}: IMonthsChipsProps) {
	return (
		<Fade in={isExpanded} unmountOnExit>
			<Stack direction='row' justifyContent='flex-start' flexGrow={1} columnGap={2}>
				<Divider orientation='vertical' />
				<Stack direction='row' columnGap={2}>
					{months.map((month, index) => (
						<StyledChip
							clickable
							key={month}
							label={month}
							onClick={handleSelectChipFilterOption(index)}
							monthPanelIsActivated={month === currentBadgeContent}
						/>
					))}
				</Stack>
			</Stack>
		</Fade>
	);
}

export default MonthsChips;
