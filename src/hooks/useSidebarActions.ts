import { useAppDispatch } from 'hooks/redux';
import { changeSidebarIsOpen, setSidebarSelector } from '../features/sidebar/sidebarSlice';

import type { SidebarPages, SidebarSelectors } from '../features/sidebar/sidebarSlice';

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
	};

	return { openSidebarWith, closeSidebar };
};
