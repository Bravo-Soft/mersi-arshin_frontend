import { useState, MouseEvent } from 'react';

import {
	resetSelectedDataArshinItem,
	setSelectedDataArshinItem,
	setSelectedEditItemIds,
} from '../arshinTableSlice';

import { ICoordinates } from 'features/dataTable/hooks/useContextMenuActions';
import { isValueDefined } from 'guards/isValueDefined';
import { useAppDispatch } from 'hooks/redux';
import { IDataItemArshin } from 'types/arshinIntegration';

export type UseArshinContextMenuActionsReturned = ReturnType<typeof useContextMenuActions>;

export const useContextMenuActions = (data: IDataItemArshin[]) => {
	const [contextMenu, setContextMenu] = useState<ICoordinates | null>(null);

	const dispatch = useAppDispatch();

	const handleCloseContextMenu = () => {
		dispatch(resetSelectedDataArshinItem());
		setContextMenu(null);
	};

	const handleOpenContextMenu = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();

		const currentId = event.currentTarget.getAttribute('data-id');
		if (currentId !== null) {
			const fondedDataItem = data.find(({ id }) => id === currentId);

			if (isValueDefined(fondedDataItem)) {
				dispatch(setSelectedDataArshinItem(fondedDataItem));
				dispatch(setSelectedEditItemIds(fondedDataItem.id));
				setContextMenu(
					contextMenu === null
						? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
						: null
				);
			}
		}
	};

	return {
		contextMenu,
		actions: {
			handleCloseContextMenu,
			handleOpenContextMenu,
		},
	};
};
