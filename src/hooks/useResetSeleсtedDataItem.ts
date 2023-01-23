import { resetSelectedDataItem } from 'features/dataTable/dataTableSlice';
import { isFormSelector } from 'guards/isFormSelector';
import { useEffect } from 'react';
import { useAppDispatch } from './redux';

import type { SidebarSelectors } from 'features/sidebar/sidebarSlice';

/**
 * Простой хук, который следит за состоянием сайдбара и сбрасывает выбранную строку, если состояние удовлетворяет некоторым требованиям
 * @param selector текущий селектор сайдбара
 * @param open закрыт или открыт сайдбар
 */
export const useResetSelectedId = (selector: SidebarSelectors, open: boolean) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!isFormSelector(selector) || !open) {
			// Если текущий компонент НЕ является формой или он ЗАКРЫТ, тогда сбрасывается выбранная позиция
			dispatch(resetSelectedDataItem());
		}
	}, [selector, dispatch, open]);
};
