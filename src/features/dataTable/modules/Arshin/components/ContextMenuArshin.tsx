import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { SvgIconProps } from '@mui/material';
import { red } from '@mui/material/colors';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';

import { selectSelectedArshin } from '../arshinTableSlice';
import { useArshinActions } from '../hooks/useArshinActions';
import { UseArshinContextMenuActionsReturned } from '../hooks/useContextMenuActions';

import UpdateMenuItem from './UpdateMenuItem';

import { SidebarTitles } from 'constant/sidebarTitles';
import { useAppSelector } from 'hooks/redux';
import StyledMenuItem from 'styled/StyledMenuItem';

interface IMenuItem {
	title: string;
	isDisabled: boolean;
	Icon: (props: SvgIconProps) => JSX.Element;
	action: VoidFunction;
}

function ContextMenuArshin({ contextMenu, actions }: UseArshinContextMenuActionsReturned) {
	const { handleDeleteItems, handleContextMenuEditArshinItem } = useArshinActions();

	const selectedDataIds = useAppSelector(selectSelectedArshin);

	const { handleCloseContextMenu } = actions;

	const menuItems: IMenuItem[] = [
		{
			title: SidebarTitles.EDIT_ITEM,
			Icon: EditIcon,
			isDisabled: true,
			action: handleContextMenuEditArshinItem,
		},
		{
			title: 'Удалить выделенное',
			Icon: DeleteIcon,
			isDisabled: Boolean(selectedDataIds?.length),
			action: handleDeleteItems,
		},
	];

	const handleClick = (action: VoidFunction, isActive: boolean) => () => {
		isActive && action();
		handleCloseContextMenu();
	};

	const openContextMenu = contextMenu
		? { top: contextMenu.mouseY, left: contextMenu.mouseX }
		: undefined;

	return (
		<Menu
			open={Boolean(contextMenu)}
			onClose={handleCloseContextMenu}
			anchorReference='anchorPosition'
			anchorPosition={openContextMenu}
			PaperProps={{
				id: 'context-menu',
			}}
			componentsProps={{
				root: {
					onContextMenu: e => {
						e.preventDefault();
						handleCloseContextMenu();
					},
				},
			}}
		>
			<UpdateMenuItem onClose={handleCloseContextMenu} />
			{menuItems.map(({ action, title, Icon, isDisabled }) => (
				<StyledMenuItem
					moduleIsActive={true}
					disabled={!isDisabled}
					key={title}
					onClick={handleClick(action, isDisabled)}
					sx={{
						...(title === 'Удалить выделенное'
							? {
									':hover': {
										backgroundColor: red[50],
										color: red[700],
										'& .MuiSvgIcon-root': {
											color: red[700],
										},
									},
							  }
							: {}),
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
