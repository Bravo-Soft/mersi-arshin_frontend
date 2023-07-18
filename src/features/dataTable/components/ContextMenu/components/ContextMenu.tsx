import AttachFileIcon from '@mui/icons-material/AttachFile';
import CheckIcon from '@mui/icons-material/Check';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { yellow } from '@mui/material/colors';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';

import { Messages } from 'constant/messages';
import { SidebarTitles } from 'constant/sidebarTitles';
import { selectSelectedDataItem, selectSelectionModel } from 'features/dataTable/dataTableSlice';
import type { UseContextMenuActionsReturned } from 'features/dataTable/hooks/useContextMenuActions';
import { selectActualStep, selectMenuStart } from 'features/quickTour/components/quickTourSlice';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { selectUserId, selectUserPermissions, selectUserRoles } from 'features/user/userSlice';
import { isValueDefined } from 'guards/isValueDefined';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import DeleteMenuItem from 'styled/DeleteMenuItem';
import StyledMenuItem from 'styled/StyledMenuItem';

interface IMenuItem {
	title: SidebarTitles | string;
	isActive: boolean;
	Icon: (props: SvgIconProps) => JSX.Element;
	action: () => void;
}

interface IContextMenuProps extends UseContextMenuActionsReturned {
	apiRef: React.MutableRefObject<GridApiPro>;
}

function ContextMenu({ contextMenu, actionsOfContextMenu }: IContextMenuProps): JSX.Element {
	const dispatch = useAppDispatch();

	/* Селекторы */
	const selectedDataItem = useAppSelector(selectSelectedDataItem);
	const selectionModel = useAppSelector(selectSelectionModel);
	const { isWriter, isAdmin } = useAppSelector(selectUserRoles);
	const userId = useAppSelector(selectUserId);
	const tourStartedIsMenu = useAppSelector(selectMenuStart);
	// const { attachFiles, hasFavorites, hasClipboard } = useAppSelector(selectUserPermissions);
	const { isFileStorage } = useAppSelector(selectUserPermissions);

	const isFavoriteRow =
		isValueDefined(selectedDataItem) && userId && selectedDataItem.userIds.includes(userId);

	const {
		handleClose,
		handleOpenEditDataItem,
		handleOpenVerificationDataItem,
		handleOpenDeleteDialog,
		handleOpenFilesOfDataItem,
		handleAddToFavorite,
		handleRemoveFromFavorite,
		handleCopySelectedValues,
	} = actionsOfContextMenu;

	const actualStep = useAppSelector(selectActualStep);

	const handleClick = (action: () => void, isActive: boolean) => () => {
		handleClose();
		isActive
			? action()
			: dispatch(
					changeSmartDialogState({
						variant: 'payment',
						isOpen: true,
						content: Messages.MODULE_IS_NOT_PAID,
					})
			  );
	};

	const getSecondaryTextForFavoriteItem = (array: IMenuItem[], favoriteIndex: number) => {
		if (selectionModel.length && array.length - 1 === favoriteIndex) {
			return 'В том числе выделенные';
		}
	};

	const menuItems: IMenuItem[] = [
		{
			title: isWriter || isAdmin ? SidebarTitles.EDIT_ITEM : SidebarTitles.ITEM_INFORMATION,
			Icon: EditIcon,
			isActive: true,
			action: handleOpenEditDataItem,
		},
		{
			title: SidebarTitles.VERIFICATION_ITEM,
			Icon: CheckIcon,
			isActive: true,
			action: handleOpenVerificationDataItem,
		},
		{
			title: SidebarTitles.ITEM_FILES,
			Icon: isFileStorage.enable ? AttachFileIcon : LockIcon,
			isActive: isFileStorage.enable ?? false,
			action: handleOpenFilesOfDataItem,
		},
		{
			title: 'Скопировать данные',
			Icon: CopyAllIcon,
			isActive: true,
			action: handleCopySelectedValues,
		},
		{
			title: isFavoriteRow ? 'Убрать из избранного' : 'Добавить в избранное',
			Icon: isFavoriteRow ? StarIcon : StarBorderIcon,
			isActive: true,
			action: isFavoriteRow ? handleRemoveFromFavorite : handleAddToFavorite,
		},
	];

	const openContextMenu =
		actualStep === 2 && tourStartedIsMenu ? { mouseX: 227, mouseY: 251 } : contextMenu;

	return (
		<Menu
			open={Boolean(openContextMenu)}
			onClose={handleClose}
			anchorReference='anchorPosition'
			anchorPosition={
				openContextMenu
					? { top: openContextMenu.mouseY, left: openContextMenu.mouseX }
					: undefined
			}
			PaperProps={{
				id: 'context-menu',
			}}
			componentsProps={{
				root: {
					onContextMenu: e => {
						e.preventDefault();
						handleClose();
					},
				},
			}}
		>
			{menuItems.map(({ action, title, Icon, isActive }, index, array) => (
				<StyledMenuItem
					moduleIsActive={isActive}
					key={title}
					onClick={handleClick(action, isActive)}
				>
					<ListItemIcon>
						<Icon
							sx={{
								...(title === 'Убрать из избранного' && {
									color: yellow[700],
								}),
							}}
						/>
					</ListItemIcon>
					<ListItemText
						primary={title}
						secondary={getSecondaryTextForFavoriteItem(array, index)}
					/>
				</StyledMenuItem>
			))}
			{(isWriter || isAdmin) && (
				<DeleteMenuItem onClick={handleOpenDeleteDialog}>
					<ListItemIcon>
						<DeleteIcon />
					</ListItemIcon>
					<ListItemText>Удалить СИ</ListItemText>
				</DeleteMenuItem>
			)}
		</Menu>
	);
}
export default ContextMenu;
