import { useState } from 'react';

import type { ICoordinates } from 'features/dataTable/hooks/useContextMenuActions';
import { printingManySort } from 'features/dataTable/modules/Printing/utils/printingSort';
import type { ISortedTagItems } from 'features/dataTable/modules/Printing/utils/printingSort';
import type { ITag } from 'types/tag';

interface IUseTagActionsProps {
	tags: ITag[];
}

export const useTagActions = ({ tags }: IUseTagActionsProps) => {
	const [tagsData, setTagsData] = useState<ISortedTagItems[]>(printingManySort(tags));
	const [activeTag, setActiveTag] = useState<ISortedTagItems | null>(null);
	const [coordinates, setCoordinates] = useState<ICoordinates | null>(null);

	const handleClick = (idx: string) => (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		setCoordinates({ mouseX: event.clientX - 2, mouseY: event.clientY - 4 });
		const findTags = tagsData.find(e => e.id === idx);
		findTags && setActiveTag(findTags);
	};

	const handleClose = () => {
		setCoordinates(null);
		setActiveTag(null);
	};

	const handleClickPrintingContextMenu = (idx: string, name: string) => {
		const findObject: ISortedTagItems | undefined = tagsData.find(e => e.id === idx);
		if (findObject) {
			const updatesTagObject = {
				...findObject,
				tagsPrint: findObject.tagsPrint.map(e => ({
					...e,
					isVisible: e.translatedKey === name ? !e.isVisible : e.isVisible,
				})),
			};
			setTagsData(prev => prev.map(e => (e.id === idx ? updatesTagObject : e)));
			setActiveTag(updatesTagObject);
		}
	};

	return {
		stateActionsMenu: {
			activeTag,
			coordinates,
			tagsData,
		},
		actionsOfPrintingMenu: {
			handleClick,
			handleClose,
			handleClickPrintingContextMenu,
		},
	};
};
