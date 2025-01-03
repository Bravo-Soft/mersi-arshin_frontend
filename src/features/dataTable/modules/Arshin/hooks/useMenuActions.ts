import { useState, MouseEvent } from 'react';

import { useAppDispatch } from 'hooks/redux';

/**
 * @package хук открытия меню в тулбаре и открытия окна настройки фильтров
 * @function handleOpenMenu => функция  открытия меню
 * @function handleCloseMenu => функция закрытия меню
 * @function handleOpenFilter => функция открытия окна настройки фильтров
 * @returns возвращает {
		anchorEl,
		open,
		handleOpenMenu,
		handleCloseMenu,
	};
 */

export const useMenuActions = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};
	const dispatch = useAppDispatch();

	return {
		anchorEl,
		open,
		handleOpenMenu,
		handleCloseMenu,
	};
};
