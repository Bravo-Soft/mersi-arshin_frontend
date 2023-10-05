import { useState, MouseEvent } from 'react';

import { openFilterDialogArshin } from '../dialogArshinSlice';

import { useAppDispatch } from 'hooks/redux';

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

	const handleOpenFilter = () => {
		dispatch(openFilterDialogArshin());
	};

	return {
		anchorEl,
		open,
		handleOpenMenu,
		handleCloseMenu,
		handleOpenFilter,
	};
};
//Проверка в Госреестре
