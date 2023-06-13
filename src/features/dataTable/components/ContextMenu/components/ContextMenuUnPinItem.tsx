import ExpandIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import PushPinIcon from '@mui/icons-material/PushPin';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

import { Messages } from 'constant/messages';
import { selectedPinnedRows } from 'features/dataTable/dataTableSlice';
import StyledMenuList from 'features/dataTable/styled/StyledMenuList';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { selectUserPermissions } from 'features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import StyledMenuItem from 'styled/StyledMenuItem';


interface IContextMenuUnPinItemProps {
	handleUnPinningRow: () => void;
	handleUnPinningManyRows: () => void;
}

function ContextMenuUnPinItem({
	handleUnPinningRow,
	handleUnPinningManyRows,
}: IContextMenuUnPinItemProps) {
	const dispatch = useAppDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const selectedPinned = useAppSelector(selectedPinnedRows);

	const { rowPinning } = useAppSelector(selectUserPermissions);

	const handleToggleNastedMenu = () => {
		rowPinning
			? setIsOpen(prev => !prev)
			: dispatch(
					changeSmartDialogState({
						variant: 'payment',
						isOpen: true,
						content: Messages.MODULE_IS_NOT_PAID,
					})
			  );
	};

	return (
		<>
			<StyledMenuItem moduleIsActive={rowPinning} onClick={handleToggleNastedMenu}>
				<ListItemIcon>{rowPinning ? <PushPinIcon /> : <LockIcon />}</ListItemIcon>
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
