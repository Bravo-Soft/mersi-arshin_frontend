import { changeSidebarIsOpen, setSidebarSelector } from '../features/sidebar/sidebarSlice';
import type { SidebarPages, SidebarSelectors } from '../features/sidebar/sidebarSlice';

import { setFilterType } from 'features/dataTable/modules/Arshin/arshinTableSlice';
import { useAppDispatch } from 'hooks/redux';
import { ARSHIN_FILTER_TYPE } from 'types/arshinIntegration';

/**
 * @param page страница, на которой используется компонент сайдбара
 * @returns объект из двух функций, открытия и закрытия сайдбара
 */
export const useSidebarAction = (page: SidebarPages) => {
	const dispatch = useAppDispatch();

	/**
	 * @param selector селектор сайдбара, который следует открыть
	 */
	const openSidebarWith = (selector: Exclude<SidebarSelectors, 'idle'>) => {
		dispatch(setSidebarSelector({ page, selector }));
		dispatch(changeSidebarIsOpen({ page, open: true }));
	};

	const closeSidebar = () => {
		dispatch(changeSidebarIsOpen({ page, open: false }));
		page === 'arshin' && dispatch(setFilterType(ARSHIN_FILTER_TYPE.MY_ITEMS));
	};

	return { openSidebarWith, closeSidebar };
};
