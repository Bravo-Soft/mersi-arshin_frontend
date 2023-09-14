import ExpandIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import PrintIcon from '@mui/icons-material/Print';
import ReplyIcon from '@mui/icons-material/Reply';
import SettingsIcon from '@mui/icons-material/Settings';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useVisibleColumns } from '../hooks/useVisibleColumns';

import { AppRoutes } from 'constant/appRoutes';
import { Messages } from 'constant/messages';
import type { IModuleMenuItemPropsAndOpenTourProps } from 'features/dataTable/modules/moduleMenuItem';
import StyledMenuList from 'features/dataTable/styled/StyledMenuList';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { usePrefetch } from 'features/user/userApiSlice';
import { selectUserPermissions } from 'features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';
import StyledMenuItem from 'styled/StyledMenuItem';

function PrintMenuItem({
	onCloseMenu,
	openTourMenuItems = false,
	...othen
}: IModuleMenuItemPropsAndOpenTourProps): JSX.Element {
	const [open, setOpen] = useState(openTourMenuItems);
	const dispatch = useAppDispatch();
	const { isPrintLabel } = useAppSelector(selectUserPermissions);

	const { openSidebarWith } = useSidebarAction('home');
	const prefetchPrintingSettings = usePrefetch('getUserPrintSettings');
	const visibleColumns = useVisibleColumns();

	const handleToggleNestedMenu = () => {
		isPrintLabel
			? setOpen(prev => !prev)
			: dispatch(
					changeSmartDialogState({
						variant: 'payment',
						isOpen: true,
						content: Messages.MODULE_IS_NOT_PAID,
					})
			  );
	};

	const handleOpenSettingsOfPrinting = () => {
		onCloseMenu();
		openSidebarWith('PrintSettings');
	};

	const handlePrefetchPrintingSettings = () => {
		prefetchPrintingSettings();
	};

	return (
		<>
			<StyledMenuItem moduleIsActive={isPrintLabel} onClick={handleToggleNestedMenu} {...othen}>
				<ListItemIcon>{isPrintLabel ? <PrintIcon /> : <LockIcon />}</ListItemIcon>
				<ListItemText>Печать бирок</ListItemText>
				<ExpandIcon
					color='action'
					sx={{
						transition: theme => theme.transitions.create('rotate'),
						rotate: open ? '180deg' : '0deg',
					}}
				/>
			</StyledMenuItem>
			<Collapse in={open}>
				<StyledMenuList disablePadding component='div'>
					<MenuItem
						onClick={onCloseMenu}
						component={Link}
						to={AppRoutes.PRINT}
						state={{ visibleColumns }}
					>
						<ListItemIcon>
							<ReplyIcon />
						</ListItemIcon>
						<ListItemText primary='Отправить на печать' />
					</MenuItem>
					<MenuItem
						onClick={handleOpenSettingsOfPrinting}
						onMouseEnter={handlePrefetchPrintingSettings}
					>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary='Настройки' />
					</MenuItem>
				</StyledMenuList>
			</Collapse>
		</>
	);
}

export default PrintMenuItem;
