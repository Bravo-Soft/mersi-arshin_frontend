import ExpandIcon from '@mui/icons-material/ExpandMore';
import UploadIcon from '@mui/icons-material/Upload';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';

import type { IModuleMenuItemProps } from '../moduleMenuItem';

import { useUploadHandlers } from './hooks/useUploadHandlers';
import XMLIcon from './XmlIcon';

import StyledMenuList from 'features/dataTable/styled/StyledMenuList';
import StyledMenuItem from 'styled/StyledMenuItem';

function XMLMenuItem({ onCloseMenu, ...other }: IModuleMenuItemProps): JSX.Element {
	const [open, setOpen] = useState(false);

	const { downloadDataXML } = useUploadHandlers({
		onCloseMenu,
	});

	const handleToggleNestedMenuItem = () => {
		setOpen(prev => !prev);
	};

	return (
		<>
			<StyledMenuItem moduleIsActive onClick={handleToggleNestedMenuItem} {...other}>
				<ListItemIcon>
					<UploadIcon />
				</ListItemIcon>
				<ListItemText>Отчеты в формате XML</ListItemText>
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
					<StyledMenuItem moduleIsActive={true} onClick={downloadDataXML}>
						<ListItemIcon>
							<XMLIcon />
						</ListItemIcon>
						<ListItemText primary='Отчет для Росакредитации' />
					</StyledMenuItem>
					<StyledMenuItem moduleIsActive={true} onClick={downloadDataXML}>
						<ListItemIcon>
							<XMLIcon />
						</ListItemIcon>
						<ListItemText primary='Отчет XML' />
					</StyledMenuItem>
				</StyledMenuList>
			</Collapse>
		</>
	);
}

export default XMLMenuItem;
