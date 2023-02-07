import { yellow } from '@mui/material/colors';
import { Messages } from 'constant/messages';
import { SidebarTitles } from 'constant/sidebarTitles';
import {
	selectedPinnedRows,
	selectSelectedDataItem,
	selectSelectionModel,
} from 'features/dataTable/dataTableSlice';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { selectUserId, selectUserPermissions, selectUserRoles } from 'features/user/userSlice';
import { isValueDefined } from 'guards/isValueDefined';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { UseContextMenuActionsReturned } from 'features/dataTable/hooks/useContextMenuActions';
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';

import CheckIcon from '@mui/icons-material/Check';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import DeleteMenuItem from 'styled/DeleteMenuItem';
import StyledMenuItem from 'styled/StyledMenuItem';
import ContextMenuPinItem from './ContextMenuPinItem';
import ContextMenuUnPinItem from './ContextMenuUnPinItem';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ListItemIcon from '@mui/material/ListItemIcon';

interface IMenuItem {
	title: SidebarTitles | string;
	isActive: boolean;
	Icon: (props: SvgIconProps) => JSX.Element;
	action: () => void;
}

interface IContextMenuProps extends UseContextMenuActionsReturned {
	apiRef: React.MutableRefObject<GridApiPro>;
}

function ContextMenu({
	contextMenu,
	actionsOfContextMenu,
	apiRef,
}: IContextMenuProps): JSX.Element {
	const dispatch = useAppDispatch();

	/* Селекторы */
	const selectedDataItem = useAppSelector(selectSelectedDataItem);
	const selectionModel = useAppSelector(selectSelectionModel);
	const pinningRows = useAppSelector(selectedPinnedRows);
	const { isWriter, isAdmin } = useAppSelector(selectUserRoles);
	const userId = useAppSelector(selectUserId);
	const { attachFiles, hasFavorites, hasClipboard } = useAppSelector(selectUserPermissions);

	const isFavoriteRow =
		isValueDefined(selectedDataItem) && userId && selectedDataItem.userIds.includes(userId);
	const isPinnedRow =
		isValueDefined(selectedDataItem) && pinningRows.includes(selectedDataItem.id);

	const {
		handleClose,
		handleOpenEditDataItem,
		handleOpenVerificateDataItem,
		handleOpenDeleteDialog,
		handleOpenFilesOfDataItem,
		handlePinningRow,
		handlePinningManyRows,
		handleUnPinningRow,
		handleUnPinningManyRows,
		handleAddToFavorite,
		handleRemoveFromFavorite,
		handleCopySelectedValues,
	} = actionsOfContextMenu;

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

	const getIconForFavoriteItem = (hasFavoritePermission?: boolean) => {
		if (!hasFavoritePermission) {
			return LockIcon;
		}

		return isFavoriteRow ? StarIcon : StarBorderIcon;
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
			title: SidebarTitles.VERIFICATE_ITEM,
			Icon: CheckIcon,
			isActive: true,
			action: handleOpenVerificateDataItem,
		},
		{
			title: SidebarTitles.ITEM_FILES,
			Icon: attachFiles ? AttachFileIcon : LockIcon,
			isActive: attachFiles ?? false,
			action: handleOpenFilesOfDataItem,
		},
		{
			title: 'Скопировать данные',
			Icon: hasClipboard ? CopyAllIcon : LockIcon,
			isActive: hasClipboard ?? false,
			action: handleCopySelectedValues,
		},
		{
			title: isFavoriteRow ? 'Убрать из избранного' : 'Добавить в избранное',
			Icon: getIconForFavoriteItem(hasFavorites),
			isActive: hasFavorites ?? false,
			action: isFavoriteRow ? handleRemoveFromFavorite : handleAddToFavorite,
		},
	];

	return (
		<Menu
			open={Boolean(contextMenu)}
			onClose={handleClose}
			anchorReference='anchorPosition'
			anchorPosition={
				contextMenu ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
			}
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
			{!isPinnedRow ? (
				<ContextMenuPinItem
					handlePinningRow={handlePinningRow}
					handlePinningManyRows={handlePinningManyRows}
					apiRef={apiRef}
				/>
			) : (
				<ContextMenuUnPinItem
					handleUnPinningRow={handleUnPinningRow}
					handleUnPinningManyRows={handleUnPinningManyRows}
				/>
			)}

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
