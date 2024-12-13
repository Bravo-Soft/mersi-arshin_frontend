import ExpandIcon from '@mui/icons-material/ExpandMore';
import FileIcon from '@mui/icons-material/InsertDriveFile';
import UploadIcon from '@mui/icons-material/Upload';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';

import type { IModuleMenuItemPropsAndOpenTourProps } from '../moduleMenuItem';

import ExcelIcon from './ExcelIcon';
import { useUploadHandlers } from './hooks/useUploadHandlers';

import StyledMenuList from 'features/dataTable/styled/StyledMenuList';
import StyledMenuItem from 'styled/StyledMenuItem';

function ExportMenuItem({
	onCloseMenu,
	openTourMenuItems = false,
	...othen
}: IModuleMenuItemPropsAndOpenTourProps): JSX.Element {
	const [open, setOpen] = useState(openTourMenuItems);

	const { handleUploadToCSV, handleUploadToXLSX } = useUploadHandlers({
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
				<ListItemText>Единый реестр</ListItemText>
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
			</Collapse>
		</>
	);
}

export default ExportMenuItem;
