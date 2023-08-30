import CachedIcon from '@mui/icons-material/Cached';
import DeleteIcon from '@mui/icons-material/Delete';
import { SvgIconProps } from '@mui/material';
import { red } from '@mui/material/colors';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';

import { selectSelectedDataIds, selectSelectedItemsDone } from '../arshinTableSlice';
import { useMenuActions } from '../hooks/useMenuActions';

import { ICoordinates } from 'features/dataTable/hooks/useContextMenuActions';
import { useAppSelector } from 'hooks/redux';
import StyledMenuItem from 'styled/StyledMenuItem';

interface IContextMenuProps {
	contextMenu: ICoordinates | null;
	handleClose: VoidFunction;
}

interface IMenuItem {
	title: string;
	isDisabled: boolean;
	Icon: (props: SvgIconProps) => JSX.Element;
	action: VoidFunction;
}

function ContextMenuArshin({ contextMenu, handleClose }: IContextMenuProps) {
	const { handleSynchronizeItems, handleDeleteItems } = useMenuActions();

	const selectionIds = useAppSelector(selectSelectedDataIds);
	const selectionItemsDone = useAppSelector(selectSelectedItemsDone);

	const menuItems: IMenuItem[] = [
		{
			title: 'Обновить',
			Icon: CachedIcon,
			isDisabled: Boolean(selectionItemsDone?.length),
			action: () => handleSynchronizeItems(selectionIds),
		},
		{
			title: 'Удалить',
			Icon: DeleteIcon,
			isDisabled: Boolean(selectionIds?.length),
			action: () => handleDeleteItems(selectionIds),
		},
	];

	const handleClick = (action: VoidFunction, isActive: boolean) => () => {
		handleClose();
		isActive && action();
	};

	const openContextMenu = contextMenu
		? { top: contextMenu.mouseY, left: contextMenu.mouseX }
		: undefined;

	return (
		<Menu
			open={Boolean(contextMenu)}
			onClose={handleClose}
			anchorReference='anchorPosition'
			anchorPosition={openContextMenu}
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
			{menuItems.map(({ action, title, Icon, isDisabled }) => (
				<StyledMenuItem
					moduleIsActive={true}
					disabled={!isDisabled}
					key={title}
					onClick={handleClick(action, isDisabled)}
					sx={{
						...(title === 'Удалить выделенное' && {
							':hover': {
								backgroundColor: red[50],
								color: red[700],
								'& .MuiSvgIcon-root': {
									color: red[700],
								},
							},
						}),
					}}
				>
					<ListItemIcon>
						<Icon />
					</ListItemIcon>
					<ListItemText primary={title} />
				</StyledMenuItem>
			))}
		</Menu>
	);
}

export default ContextMenuArshin;
