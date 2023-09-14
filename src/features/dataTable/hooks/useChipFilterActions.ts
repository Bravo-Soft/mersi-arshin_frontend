import { useState } from 'react';

import type { ChipFilterOptions } from '../components/Toolbar/components/DataTableToolbarFilter/toolBarFilters';
import { months } from '../components/Toolbar/components/DataTableToolbarFilter/toolBarFilters';
import {
	changeChipFilterOption,
	resetDataTableState,
	selectCurrentChipFilterVariant,
	unpinManyRows,
} from '../dataTableSlice';

import { useAppDispatch, useAppSelector } from 'hooks/redux';

export const useChipFilterActions = () => {
	const dispatch = useAppDispatch();
	const [isExpanded, setIsExpanded] = useState(false);

	const currentFilteringOption = useAppSelector(selectCurrentChipFilterVariant);

	const selectedOptionIsMonth = typeof currentFilteringOption === 'number';
	const currentBadgeContent = selectedOptionIsMonth && months[currentFilteringOption];

	const checkHasChoiceMonth = () => {
		setIsExpanded(prev => !prev);
	};

	const handleSelectChipFilterOption = (newOption: ChipFilterOptions) => () => {
		dispatch(unpinManyRows());

		if (newOption === currentFilteringOption) {
			isExpanded && checkHasChoiceMonth();
			dispatch(resetDataTableState());
		} else {
			isExpanded && checkHasChoiceMonth();
			dispatch(changeChipFilterOption(newOption));
		}
	};

	const currentChipIsFavorite = (option: ChipFilterOptions) => {
		return option === 'Избранное' && option === currentFilteringOption;
	};
	const currentChipIsOverdue = (option: ChipFilterOptions) => {
		return option === 'Просроченные' && option === currentFilteringOption;
	};

	return {
		state: {
			isExpanded,
			selectedOptionIsMonth,
			currentFilteringOption,
			currentBadgeContent,
		},
		actions: {
			checkHasChoiceMonth,

			handleSelectChipFilterOption,
			currentChipIsFavorite,
			currentChipIsOverdue,
		},
	};
};
