import { Messages } from 'constant/messages';
import { selectSelectedDataItem, selectSelectionModel } from 'features/dataTable/dataTableSlice';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { selectUserPermissions } from 'features/user/userSlice';
import { isValueDefined } from 'guards/isValueDefined';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useState } from 'react';

import type { MenuItemProps } from '@mui/material/MenuItem';

import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import StyledMenuList from 'features/dataTable/styled/StyledMenuList';
import StyledMenuItem from 'styled/StyledMenuItem';

import ExpandIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import PushPinIcon from '@mui/icons-material/PushPin';
import ListItemIcon from '@mui/material/ListItemIcon';

interface IContextMenuPinItemProps extends Required<Pick<MenuItemProps, 'disabled'>> {
	handlePinningRow: () => void;
	handlePinningManyRows: () => void;
}

function ContextMenuPinItem({
	handlePinningRow,
	handlePinningManyRows,
	disabled,
}: IContextMenuPinItemProps) {
	const dispatch = useAppDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const selectionModel = useAppSelector(selectSelectionModel);
	const selectedDataItem = useAppSelector(selectSelectedDataItem);

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

	const pinMenuIsActive =
		(selectionModel.length &&
			isValueDefined(selectedDataItem) &&
			!selectionModel.includes(selectedDataItem.id)) ||
		selectionModel.length > 1;

	return (
		<>
			<StyledMenuItem
				moduleIsActive={rowPinning}
				onClick={handleToggleNastedMenu}
				disabled={disabled}
			>
				<ListItemIcon>{rowPinning ? <PushPinIcon /> : <LockIcon />}</ListItemIcon>
				<ListItemText
					primary='Закрепить'
					secondary={disabled ? 'Невозможно закрепить' : undefined}
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
