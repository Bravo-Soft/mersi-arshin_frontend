import { useState } from 'react';
import { selectUserPermissions } from 'features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
	changeChipFilterOption,
	resetDataTableState,
	selectCurrentChipFilterVariant,
	unpinManyRows,
} from '../dataTableSlice';
import { Messages } from 'constant/messages';
import { months } from '../components/Toolbar/components/DataTableToolbarFilter/toolBarFilters';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';

import type { ChipFilterOptions } from '../components/Toolbar/components/DataTableToolbarFilter/toolBarFilters';

export const useChipFilterActions = () => {
	const dispatch = useAppDispatch();
	const [isExpanded, setIsExpanded] = useState(false);

	const currentFilteringOption = useAppSelector(selectCurrentChipFilterVariant);

	const selectedOptionIsMonth = typeof currentFilteringOption === 'number';
	const currentBadgeContent = selectedOptionIsMonth && months[currentFilteringOption];

	const { hasFavorites, hasChoiceMonth, hasChooseExpiredValue } =
		useAppSelector(selectUserPermissions);

	const openPaymentDialog = () => {
		dispatch(
			changeSmartDialogState({
				variant: 'payment',
				isOpen: true,
				content: Messages.MODULE_IS_NOT_PAID,
			})
		);
	};

	const checkHasChoiceMonth = () => {
		hasChoiceMonth ? setIsExpanded(prev => !prev) : openPaymentDialog();
	};

	const currentChipIsPayd = (option: ChipFilterOptions) => {
		switch (option) {
			case 'Избранное':
				return hasFavorites;
			case 'Месяц':
				return hasChoiceMonth;
			case 'Просроченные':
				return hasChooseExpiredValue;
			default:
				return true;
		}
	};

	const handleSelectChipFilterOption = (newOption: ChipFilterOptions) => () => {
		dispatch(unpinManyRows());

		if (!currentChipIsPayd(newOption)) {
			return openPaymentDialog();
		}
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
			currentChipIsPayd,
			handleSelectChipFilterOption,
			currentChipIsFavorite,
			currentChipIsOverdue,
		},
	};
};
