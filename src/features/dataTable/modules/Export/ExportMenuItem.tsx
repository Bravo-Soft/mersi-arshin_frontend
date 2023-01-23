import { useUploadHandlers } from './hooks/useUploadHandlers';
import { selectUserPermissions } from 'features/user/userSlice';
import { useAppSelector } from 'hooks/redux';
import { useState } from 'react';

import type { IModuleMenuItemProps } from '../moduleMenuItem';

import ExpandIcon from '@mui/icons-material/ExpandMore';
import FileIcon from '@mui/icons-material/InsertDriveFile';
import LockIcon from '@mui/icons-material/Lock';
import UploadIcon from '@mui/icons-material/Upload';

import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StyledMenuList from 'features/dataTable/styled/StyledMenuList';
import StyledMenuItem from 'styled/StyledMenuItem';
import ExcelIcon from './ExcelIcon';

function ExportMenuItem({ onCloseMenu, ...othen }: IModuleMenuItemProps): JSX.Element {
	const [open, setOpen] = useState(false);
	const { isCSVEnabled, isXLSXEnabled } = useAppSelector(selectUserPermissions);

	const { handleUploadToCSV, handleUploadToXLSX } = useUploadHandlers({
		isCSVEnabled,
		isXLSXEnabled,
		onCloseMenu,
	});

	const handleToggleNestedMenuItem = () => {
		setOpen(prev => !prev);
	};

	return (
		<>
			<StyledMenuItem moduleIsActive onClick={handleToggleNestedMenuItem} {...othen}>
				<ListItemIcon>
					<UploadIcon />
				</ListItemIcon>
				<ListItemText>Выгрузить</ListItemText>
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
					<StyledMenuItem moduleIsActive={isCSVEnabled} onClick={handleUploadToCSV}>
						<ListItemIcon>{isCSVEnabled ? <FileIcon /> : <LockIcon />}</ListItemIcon>
						<ListItemText primary='Выгрузить в CSV' />
					</StyledMenuItem>
					<StyledMenuItem moduleIsActive={isXLSXEnabled} onClick={handleUploadToXLSX}>
						<ListItemIcon>{isXLSXEnabled ? <ExcelIcon /> : <LockIcon />}</ListItemIcon>
						<ListItemText primary='Выгрузить в XLSX' />
					</StyledMenuItem>
				</StyledMenuList>
			</Collapse>
		</>
	);
}

export default ExportMenuItem;
