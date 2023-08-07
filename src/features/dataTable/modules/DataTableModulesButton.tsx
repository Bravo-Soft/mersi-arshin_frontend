import ExpandIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import { useRef, useState, useEffect } from 'react';
import type { MouseEvent } from 'react';

import ArshinMenuItem from './Arshin/ArshinMenuItem';
import CreateVerificationScheduleMenuItem from './CreateVerificationSchedule/CreateVerificationScheduleMenuItem';
import ExportMenuItem from './Export/ExportMenuItem';
import NotificationsMenuItem from './Notifications/NotificationsMenuItem';
import TemplateForm from './Templates/TemplateForm';
import TemplatesMenuItem from './Templates/TemplatesMenuItem';

import { PrintMenuItem } from 'features/dataTable/modules/Printing';
import { selectActualStep } from 'features/quickTour/components/quickTourSlice';
import { usePrefetch } from 'features/user/userApiSlice';
import { useAppSelector } from 'hooks/redux';

function DataTableModulesButton(): JSX.Element {
	const [templateFormIsOpen, setTemplateFormIsOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const loadUserNotificationSettings = usePrefetch('getUserNotification');
	const actualStep = useAppSelector(selectActualStep);

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

	useEffect(() => {
		if (actualStep === 11 && buttonRef.current) {
			buttonRef.current.click();
		} else {
			setAnchorEl(null);
		}
	}, [actualStep]);

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
					openTourMenuItems={actualStep === 11}
				/>
				<PrintMenuItem
					onCloseMenu={handleCloseModulesMenu}
					openTourMenuItems={actualStep === 11}
				/>
				<NotificationsMenuItem
					onCloseMenu={handleCloseModulesMenu}
					onMouseEnter={handlePrefetchUserNotificationSettings}
				/>
				<ExportMenuItem
					onCloseMenu={handleCloseModulesMenu}
					openTourMenuItems={actualStep === 11}
				/>
				<ArshinMenuItem onCloseMenu={handleCloseModulesMenu} />
			</Menu>
			<TemplateForm open={templateFormIsOpen} onClose={handleToggleTemplateForm} />
		</>
	);
}

export default DataTableModulesButton;
