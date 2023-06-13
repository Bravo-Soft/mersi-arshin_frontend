import ExpandIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import PushPinIcon from '@mui/icons-material/PushPin';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { gridVisibleSortedRowEntriesSelector } from '@mui/x-data-grid-pro';
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import { useState } from 'react';

import { Messages } from 'constant/messages';
import usePinnRows from 'features/dataTable/hooks/usePinnRows';
import StyledMenuList from 'features/dataTable/styled/StyledMenuList';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { selectUserPermissions } from 'features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import StyledMenuItem from 'styled/StyledMenuItem';


interface IContextMenuPinItemProps {
	handlePinningRow: () => void;
	handlePinningManyRows: () => void;
	apiRef: React.MutableRefObject<GridApiPro>;
}

function ContextMenuPinItem({
	handlePinningRow,
	handlePinningManyRows,
	apiRef,
}: IContextMenuPinItemProps) {
	const dispatch = useAppDispatch();
	const [isOpen, setIsOpen] = useState(false);
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

	const { pinMenuIsActive, disabledPin } = usePinnRows(
		gridVisibleSortedRowEntriesSelector(apiRef)
	);

	return (
		<>
			<StyledMenuItem
				moduleIsActive={rowPinning}
				onClick={handleToggleNastedMenu}
				disabled={disabledPin}
			>
				<ListItemIcon>{rowPinning ? <PushPinIcon /> : <LockIcon />}</ListItemIcon>
				<ListItemText
					primary='Закрепить'
					secondary={disabledPin ? 'Невозможно закрепить' : undefined}
				/>
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
					<MenuItem onClick={handlePinningRow}>
						<ListItemText primary='Закрепить' />
					</MenuItem>
					<MenuItem onClick={handlePinningManyRows} disabled={!pinMenuIsActive}>
						<ListItemText primary='Закрепить выбранные позиции' />
					</MenuItem>
				</StyledMenuList>
			</Collapse>
		</>
	);
}

export default ContextMenuPinItem;
