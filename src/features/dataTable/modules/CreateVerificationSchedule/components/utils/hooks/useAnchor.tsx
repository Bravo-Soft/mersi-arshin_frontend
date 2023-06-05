import { useCallback, useState } from 'react';
import type { SyntheticEvent } from 'react';

type UseAnchorElHook = () => [null | Element, (event: SyntheticEvent) => void, VoidFunction];

export const useAnchor: UseAnchorElHook = () => {
	const [anchorEl, setAnchorEl] = useState<null | Element>(null);

	const handleOpen = useCallback((event: SyntheticEvent) => {
		setAnchorEl(event.currentTarget);
	}, []);

	const handleClose = useCallback(() => {
		setAnchorEl(null);
	}, []);

	return [anchorEl, handleOpen, handleClose];
};
