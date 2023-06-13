import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { GridToolbarColumnsButton } from '@mui/x-data-grid/components';

import { Messages } from 'constant/messages';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { selectUserPermissions } from 'features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';



function DataTableColumnButton(): JSX.Element | null {
	const dispatch = useAppDispatch();
	const { hidingColumns } = useAppSelector(selectUserPermissions);

	const handleOpenPaymentDialog = () => {
		dispatch(
			changeSmartDialogState({
				variant: 'payment',
				isOpen: true,
				content: Messages.MODULE_IS_NOT_PAID,
			})
		);
	};

	return hidingColumns ? (
		<Tooltip title='Настройки видимости столбцов'>
			<GridToolbarColumnsButton id='column-btn' />
		</Tooltip>
	) : (
		<Button
			size='small'
			id='column-btn'
			startIcon={<LockIcon />}
			sx={{
				color: 'text.secondary',
				cursor: 'help',
				':hover': {
					color: 'warning.main',
					bgcolor: theme =>
						alpha(theme.palette.warning.main, theme.palette.action.hoverOpacity),
				},
			}}
			onClick={handleOpenPaymentDialog}
		>
			Столбцы
		</Button>
	);
}

export default DataTableColumnButton;
