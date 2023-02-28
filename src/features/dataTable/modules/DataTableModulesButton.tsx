import { useRef, useState } from 'react';
import { PrintMenuItem } from 'features/dataTable/modules/Printing';
import { usePrefetch } from 'features/user/userApiSlice';

import type { MouseEvent } from 'react';

import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TemplateForm from './Templates/TemplateForm';
import ExportMenuItem from './Export/ExportMenuItem';
import ExpandIcon from '@mui/icons-material/ExpandMore';
import TemplatesMenuItem from './Templates/TemplatesMenuItem';
import NotificationsMenuItem from './Notifications/NotificationsMenuItem';
import CreateVerificationScheduleMenuItem from './CreateVerificationSchedule/CreateVerificationScheduleMenuItem';

function DataTableModulesButton(): JSX.Element {
	const [templateFormIsOpen, setTemplateFormIsOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const loadUserNotificationSettings = usePrefetch('getUserNotification');

	const open = Boolean(anchorEl);

	const handleOpenModulesMenu = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseModulesMenu = () => {
		setAnchorEl(null);
	};

	const handleToggleTemplateForm = () => {
		setTemplateFormIsOpen(prev => !prev);
	};

	const handlePrefetchUserNotificationSettings = () => {
		loadUserNotificationSettings();
	};

	return (
		<>
			<Tooltip title='Открыть панель инструментов'>
				<Button
					ref={buttonRef}
					onClick={handleOpenModulesMenu}
					id='modules-btn'
					startIcon={
						<ExpandIcon
							sx={{
								transition: theme => theme.transitions.create('rotate'),
								rotate: open ? '180deg' : '0deg',
							}}
						/>
					}
				>
					Инструменты
				</Button>
			</Tooltip>
			<Menu
				open={open}
				onClose={handleCloseModulesMenu}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				PaperProps={{ sx: { width: 280 } }}
			>
				<CreateVerificationScheduleMenuItem onCloseMenu={handleCloseModulesMenu} />
				<TemplatesMenuItem
					onOpenTemplateForm={handleToggleTemplateForm}
					onCloseMenu={handleCloseModulesMenu}
				/>
				<PrintMenuItem onCloseMenu={handleCloseModulesMenu} />
				<NotificationsMenuItem
					onCloseMenu={handleCloseModulesMenu}
					onMouseEnter={handlePrefetchUserNotificationSettings}
				/>
				<ExportMenuItem onCloseMenu={handleCloseModulesMenu} />
			</Menu>
			<TemplateForm open={templateFormIsOpen} onClose={handleToggleTemplateForm} />
		</>
	);
}

export default DataTableModulesButton;
