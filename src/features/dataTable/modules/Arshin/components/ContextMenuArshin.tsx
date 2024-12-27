import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { SvgIconProps } from '@mui/material';
import { red } from '@mui/material/colors';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';

import {
	selectArshinData,
	selectSelectedArshin,
	selectSelectedArshinData,
} from '../arshinTableSlice';
import { useArshinActions } from '../hooks/useArshinActions';
import { useArshinRequests } from '../hooks/useArshinRequests';
import { UseArshinContextMenuActionsReturned } from '../hooks/useContextMenuActions';

import UpdateMenuItem from './UpdateMenuItem';

import { ArshinStatus } from 'constant/arshinStatus';
import { SidebarTitles } from 'constant/sidebarTitles';
import { useAppSelector } from 'hooks/redux';
import StyledMenuItem from 'styled/StyledMenuItem';

interface IMenuItem {
	title: string;
	isDisabled: boolean;
	Icon: React.ComponentType<SvgIconProps>;
	action: VoidFunction;
}

function ContextMenuArshin({ contextMenu, actions }: UseArshinContextMenuActionsReturned) {
	const { handleDeleteItems, handleContextMenuEditArshinItem } = useArshinActions();
	const { handleCreateRequest } = useArshinRequests();
	const selectedDataIds = useAppSelector(selectSelectedArshin);
	const selectedItem = useAppSelector(selectSelectedArshinData);

	const { handleCloseContextMenu } = actions;

	const itemInProcess = selectedItem?.status === ArshinStatus.PROCESS;

	const menuItems: IMenuItem[] = [
		{
			title: SidebarTitles.EDIT_ITEM,
			Icon: EditIcon,
			isDisabled: itemInProcess,
			action: handleContextMenuEditArshinItem,
		},
		{
			title: 'Создать запрос',
			Icon: AddIcon,
			isDisabled: Boolean(!selectedDataIds?.length) || itemInProcess,
			action: handleCreateRequest,
		},
		{
			title: 'Удалить выделенное',
			Icon: DeleteIcon,
			isDisabled: Boolean(!selectedDataIds?.length) || itemInProcess,
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
					disabled={isDisabled}
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
