import { useState, MouseEvent } from 'react';

import { ICoordinates } from 'features/dataTable/hooks/useContextMenuActions';

export const useContextMenuActions = () => {
	const [contextMenu, setContextMenu] = useState<ICoordinates | null>(null);
	const handleCloseContextMenu = () => {
		setContextMenu(null);
	};

	const handleOpenContextMenu = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		setContextMenu(
			contextMenu === null ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 } : null
		);
	};

	return {
		contextMenu,
		handleCloseContextMenu,
		handleOpenContextMenu,
	};
};
