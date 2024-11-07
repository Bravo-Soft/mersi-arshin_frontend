import ExpandIcon from '@mui/icons-material/ExpandMore';
import PushPinIcon from '@mui/icons-material/PushPin';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

import { selectedPinnedRows } from 'features/dataTable/dataTableSlice';
import StyledMenuList from 'features/dataTable/styled/StyledMenuList';
import { useAppSelector } from 'hooks/redux';
import StyledMenuItem from 'styled/StyledMenuItem';

interface IContextMenuUnPinItemProps {
	handleUnPinningRow: () => void;
	handleUnPinningManyRows: () => void;
}

function ContextMenuUnPinItem({
	handleUnPinningRow,
	handleUnPinningManyRows,
}: IContextMenuUnPinItemProps) {
	
	const [isOpen, setIsOpen] = useState(false);
	const selectedPinned = useAppSelector(selectedPinnedRows);

	const handleToggleNestedMenu = () => {
		setIsOpen(prev => !prev);
	};

	return (
		<>
			<StyledMenuItem moduleIsActive={true} onClick={handleToggleNestedMenu}>
				<ListItemIcon>
					<PushPinIcon />
				</ListItemIcon>
				<ListItemText>Открепить</ListItemText>
				<ExpandIcon
					color='action'
					sx={{
						transition: theme => theme.transitions.create('rotate'),
						rotate: isOpen ? '180deg' : '0deg',
					}}
				/>
			</StyledMenuItem>
			<Collapse in={isOpen}>
				<StyledMenuList disablePadding component='div'>
					<MenuItem onClick={handleUnPinningRow}>
						<ListItemText primary='Открепить' />
					</MenuItem>
					<MenuItem onClick={handleUnPinningManyRows} disabled={selectedPinned.length <= 1}>
						<ListItemText primary='Открепить все' />
					</MenuItem>
				</StyledMenuList>
			</Collapse>
		</>
	);
}

export default ContextMenuUnPinItem;
