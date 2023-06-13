import LockIcon from '@mui/icons-material/Lock';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
	GridColumnMenuContainer,
	GridColumnPinningMenuItems,
	GridFilterMenuItem,
	HideGridColMenuItem,
	SortGridMenuItems,
} from '@mui/x-data-grid-pro';
import type { GridColumnMenuProps } from '@mui/x-data-grid-pro';

import { Messages } from 'constant/messages';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { selectUserPermissions } from 'features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import StyledMenuItem from 'styled/StyledMenuItem';

function DataTableColumnMenu({
	hideMenu,
	currentColumn,
	...other
}: GridColumnMenuProps): JSX.Element {
	const dispatch = useAppDispatch();
	const { hidingColumns, columnPinning } = useAppSelector(selectUserPermissions);

	const handleOpenPaymentDialog = () => {
		dispatch(
			changeSmartDialogState({
				variant: 'payment',
				isOpen: true,
				content: Messages.MODULE_IS_NOT_PAID,
			})
		);
	};

	return (
		<>
			<GridColumnMenuContainer {...other} hideMenu={hideMenu} currentColumn={currentColumn}>
				<SortGridMenuItems onClick={hideMenu} column={currentColumn} />
				<GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
				{hidingColumns ? (
					<HideGridColMenuItem onClick={hideMenu} column={currentColumn} />
				) : (
					<StyledMenuItem moduleIsActive={hidingColumns} onClick={handleOpenPaymentDialog}>
						<ListItemIcon>
							<LockIcon />
						</ListItemIcon>
						<ListItemText>Скрыть</ListItemText>
					</StyledMenuItem>
				)}
				<Divider />
				{columnPinning ? (
					<GridColumnPinningMenuItems onClick={hideMenu} column={currentColumn} />
				) : (
					['Закрепить слева', 'Закрепить справа'].map(title => (
						<StyledMenuItem
							key={title}
							moduleIsActive={columnPinning}
							onClick={handleOpenPaymentDialog}
						>
							<ListItemIcon>
								<LockIcon />
							</ListItemIcon>
							<ListItemText>{title}</ListItemText>
						</StyledMenuItem>
					))
				)}
			</GridColumnMenuContainer>
		</>
	);
}

export default DataTableColumnMenu;
