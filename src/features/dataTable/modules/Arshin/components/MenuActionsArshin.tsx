import CachedIcon from '@mui/icons-material/Cached';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import { SvgIconProps } from '@mui/material';
import Button from '@mui/material/Button';
import red from '@mui/material/colors/red';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
// import { GridSelectionModel } from '@mui/x-data-grid-pro';
import { selectedGridRowsSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid-pro';

import { useMenuActions } from '../hooks/useMenuActions';

import StyledMenuItem from 'styled/StyledMenuItem';

interface IMenuItem {
	title: string;
	isDisabled: boolean;
	Icon: (props: SvgIconProps) => JSX.Element;
	action: VoidFunction;
}

function MenuActionsArshin() {
	const apiRef = useGridApiContext();
	const selectionIds = useGridSelector(apiRef, selectedGridRowsSelector);
	const selectionItems = Array.from(selectionIds.keys());

	const {
		anchorEl,
		open,
		handleOpenFilter,
		handleSynchronizeItems,
		handleDeleteItems,
		handleCloseMenu,
		handleOpenMenu,
	} = useMenuActions();

	const menuItems: IMenuItem[] = [
		{
			title: 'Синхронизировать выделенное',
			Icon: CachedIcon,
			isDisabled: selectionItems.length ? true : false,
			action: () => handleSynchronizeItems(selectionItems),
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
		handleCloseMenu();
		isActive && action();
	};

	return (
		<>
			<Button
				startIcon={
					<ExpandIcon
						sx={{
							transition: theme => theme.transitions.create('rotate'),
							rotate: open ? '180deg' : '0deg',
						}}
					/>
				}
				onClick={handleOpenMenu}
			>
				Действия
			</Button>
			<Menu open={open} onClose={handleCloseMenu} anchorEl={anchorEl}>
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
		</>
	);
}

export default MenuActionsArshin;
