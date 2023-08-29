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

import { selectSelectedDataIds, selectSelectedItemsDone } from '../arshinTableSlice';
import { useMenuActions } from '../hooks/useMenuActions';

import { useAppSelector } from 'hooks/redux';
import StyledMenuItem from 'styled/StyledMenuItem';

interface IMenuItem {
	title: string;
	isActive: boolean;
	Icon: (props: SvgIconProps) => JSX.Element;
	action: VoidFunction;
}

function MenuActionsArshin() {
	const selectionIds = useAppSelector(selectSelectedDataIds);
	const selectionItemsDone = useAppSelector(selectSelectedItemsDone);

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
			title: 'Обновить',
			Icon: CachedIcon,
			isActive: Boolean(selectionItemsDone.length),
			action: () => handleSynchronizeItems(selectionIds),
		},
		{
			title: 'Настроить фильтра',
			Icon: SettingsIcon,
			isActive: true,
			action: handleOpenFilter,
		},
		{
			title: 'Удалить',
			Icon: DeleteIcon,
			isActive: Boolean(selectionIds.length),
			action: () => handleDeleteItems(selectionIds),
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
				{menuItems.map(({ action, title, Icon, isActive }) => (
					<StyledMenuItem
						moduleIsActive={true}
						disabled={!isActive}
						key={title}
						onClick={handleClick(action, isActive)}
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
