import ExpandIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import { useRef, useState, useEffect } from 'react';
import type { MouseEvent } from 'react';

import CreateVerificationScheduleMenuItem from './CreateVerificationSchedule/CreateVerificationScheduleMenuItem';
import ExportMenuItem from './Export/ExportMenuItem';
import XMLMenuItem from './Export/XMLMenuItem';

import { selectActualStep } from 'features/quickTour/components/quickTourSlice';
import { useAppSelector } from 'hooks/redux';

function DataTableReportsButton(): JSX.Element {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const actualStep = useAppSelector(selectActualStep);

	const open = Boolean(anchorEl);

	const handleOpenReportsMenu = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseReportsMenu = () => {
		setAnchorEl(null);
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
			<Tooltip title='Открыть панель отчетов'>
				<Button
					ref={buttonRef}
					onClick={handleOpenReportsMenu}
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
					Выгрузить
				</Button>
			</Tooltip>
			<Menu
				open={open}
				onClose={handleCloseReportsMenu}
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
				<CreateVerificationScheduleMenuItem onCloseMenu={handleCloseReportsMenu} />
				<XMLMenuItem onCloseMenu={handleCloseReportsMenu} />
				<ExportMenuItem
					onCloseMenu={handleCloseReportsMenu}
					openTourMenuItems={actualStep === 11}
				/>
			</Menu>
		</>
	);
}

export default DataTableReportsButton;
