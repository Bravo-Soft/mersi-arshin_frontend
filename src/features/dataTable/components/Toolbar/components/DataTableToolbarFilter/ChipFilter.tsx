import CalendarMonth from '@mui/icons-material/CalendarMonth';
import StarIcon from '@mui/icons-material/Star';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { forwardRef } from 'react';

import MonthsChips from './MonthsChips';
import type { ChipFilterOptions } from './toolBarFilters';
import { chipDefaultOptions } from './toolBarFilters';

import { useChipFilterActions } from 'features/dataTable/hooks/useChipFilterActions';
import StyledChip from 'features/dataTable/styled/StyledChip';

const ChipFilter = forwardRef<HTMLDivElement>((_, ref) => {
	const {
		state: { isExpanded, selectedOptionIsMonth, currentFilteringOption, currentBadgeContent },
		actions: {
			checkHasChoiceMonth,
			handleSelectChipFilterOption,
			currentChipIsFavorite,
			currentChipIsOverdue,
		},
	} = useChipFilterActions();

	const setIconForFavoriteChip = (option: ChipFilterOptions) => {
		return option === 'Избранное' ? (
			<StarIcon />
		) : option === 'Месяц' ? (
			<CalendarMonth />
		) : undefined;
	};

	return (
		<Stack direction='row' columnGap={2} flexGrow={1}>
			{chipDefaultOptions.map(({ title, option }, index) => (
				<Tooltip key={title} title={title}>
					<StyledChip
						label={option}
						variant='filled'
						ref={index === 0 ? ref : undefined}
						color={option === currentFilteringOption ? 'primary' : 'default'}
						onClick={handleSelectChipFilterOption(option)}
						isFavoriteChip={currentChipIsFavorite(option)}
						icon={setIconForFavoriteChip(option)}
						isOverdueChip={currentChipIsOverdue(option)}
					/>
				</Tooltip>
			))}
			<Badge
				invisible={!selectedOptionIsMonth}
				color='primary'
				badgeContent={currentBadgeContent}
			>
				<Tooltip title='Выбрать месяц для фильтрации'>
					<StyledChip
						label='Месяц'
						icon={setIconForFavoriteChip('Месяц')}
						clickable
						onClick={checkHasChoiceMonth}
						monthPanelIsActivated={isExpanded || selectedOptionIsMonth}
					/>
				</Tooltip>
			</Badge>
			<MonthsChips
				isExpanded={isExpanded}
				handleSelectChipFilterOption={handleSelectChipFilterOption}
				currentBadgeContent={currentBadgeContent}
			/>
		</Stack>
	);
});

export default ChipFilter;
