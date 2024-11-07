import { useLocation } from 'react-router-dom';

import type { SidebarPages } from 'features/sidebar/sidebarSlice';

/**
 * Хук определяющий на какой странице на данный момент находится пользователь,
 * он необходим при совместном использовании с хуком [useSidebarActions](./useSidebarActions.ts)
 */
export const usePage = (): SidebarPages => {
	const { pathname } = useLocation();

	const pageName = pathname.replace(/^\/|\/$/g, '');

	const page =
		pageName === 'arshin-integration' ? 'arshin' : pageName === 'history' ? 'history' : pageName;

	return page as SidebarPages;
};
