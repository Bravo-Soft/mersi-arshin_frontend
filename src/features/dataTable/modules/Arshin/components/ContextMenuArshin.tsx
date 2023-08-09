import CachedIcon from '@mui/icons-material/Cached';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import SettingsIcon from '@mui/icons-material/Settings';
import { SvgIconProps } from '@mui/material';
import red from '@mui/material/colors/red';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import { GridSelectionModel } from '@mui/x-data-grid-pro';

import { useContextMenuActions } from '../hooks/useContextMenuActions';

import { ICoordinates } from 'features/dataTable/hooks/useContextMenuActions';
import StyledMenuItem from 'styled/StyledMenuItem';

interface IContextMenuProps {
	contextMenu: ICoordinates | null;
	selectionItems: GridSelectionModel;
	handleClose: VoidFunction;
}

interface IMenuItem {
	title: string;
	isDisabled: boolean;
	Icon: (props: SvgIconProps) => JSX.Element;
	action: VoidFunction;
}

function ContextMenuArshin({ contextMenu, selectionItems, handleClose }: IContextMenuProps) {
	const { handleOpenFilter, handleSynchronizeItems, handleGetDataFromFgis, handleDeleteItems } =
		useContextMenuActions();

	const menuItems: IMenuItem[] = [
		{
			title: 'Синхронизировать выделенное',
			Icon: CachedIcon,
			isDisabled: selectionItems.length ? true : false,
			action: () => handleSynchronizeItems(selectionItems),
		},
		{
			title: 'Запросить данные из ФГИС',
			Icon: GetAppIcon,
			isDisabled: true,
			action: handleGetDataFromFgis,
		},
		{
			title: 'Настроить фильтра',
			Icon: SettingsIcon,
			isDisabled: true,
			action: handleOpenFilter,
		},
		{
			title: 'Удалить выделенное',
			Icon: DeleteIcon,
			isDisabled: selectionItems.length ? true : false,
			action: () => handleDeleteItems(selectionItems),
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
