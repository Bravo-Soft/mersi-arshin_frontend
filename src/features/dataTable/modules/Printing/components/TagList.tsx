import { forwardRef } from 'react';
import { useTagActions } from '../hooks/useTagActions';

import type { ITag } from 'types/tag';

import Tag from './Tag';
import TagContextMenu from './TagContextMenu';
import StyledTagList from '../styled/StyledTagList';
import StyledTagBox from '../styled/StyledTagBox';

interface IPrintingTagsProps {
	tags: ITag[];
}

const TagList = forwardRef<HTMLDivElement, IPrintingTagsProps>((props, ref) => {
	const {
		actionsOfPrintingMenu: { handleClick, handleClickPrintingContextMenu, handleClose },
		stateActionsMenu: { activeTag, coordinates, tagsData },
	} = useTagActions(props);

	return (
		<StyledTagList ref={ref}>
			<StyledTagBox>
				{tagsData.map(tag => (
					<Tag key={tag.id} tag={tag} onOpenClick={handleClick} />
				))}
			</StyledTagBox>
			{activeTag && (
				<TagContextMenu
					activeTag={activeTag}
					handleClose={handleClose}
					handleClickPrintingContextMenu={handleClickPrintingContextMenu}
					coordinates={coordinates}
				/>
			)}
		</StyledTagList>
	);
});

export default TagList;
