import ExpandIcon from '@mui/icons-material/ExpandMore';
import FileIcon from '@mui/icons-material/InsertDriveFile';
import { ListItemIcon, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import { useRef, useState } from 'react';
import type { MouseEvent } from 'react';

import ExcelIcon from 'features/dataTable/modules/Export/ExcelIcon';
import { useUploadHandlers } from 'features/dataTable/modules/Export/hooks/useUploadHandlers';
import StyledMenuList from 'features/dataTable/styled/StyledMenuList';
import StyledMenuItem from 'styled/StyledMenuItem';

function ReportsButton(): JSX.Element {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const handleCloseReportsMenu = () => {
		setAnchorEl(null);
	};
	const { handleUploadToCSV, handleUploadToXLSX } = useUploadHandlers({
		onCloseMenu: handleCloseReportsMenu,
	});

	const open = Boolean(anchorEl);

	const handleOpenReportsMenu = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<>
			<Tooltip title='Открыть панель отчетов'>
				<Button
					ref={buttonRef}
					onClick={handleOpenReportsMenu}
					id='reports-btn'
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
				<StyledMenuList disablePadding component='div'>
					<StyledMenuItem moduleIsActive={true} onClick={handleUploadToCSV}>
						<ListItemIcon>
							<FileIcon />
						</ListItemIcon>
						<ListItemText primary='Выгрузить в CSV' />
					</StyledMenuItem>
					<StyledMenuItem moduleIsActive={true} onClick={handleUploadToXLSX}>
						<ListItemIcon>
							<ExcelIcon />
						</ListItemIcon>
						<ListItemText primary='Выгрузить в XLSX' />
					</StyledMenuItem>
				</StyledMenuList>
			</Menu>
		</>
	);
}

export default ReportsButton;
