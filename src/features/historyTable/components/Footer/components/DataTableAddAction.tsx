import AddIcon from '@mui/icons-material/Add';
import type { FabProps } from '@mui/material/Fab';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';

import { Messages } from 'constant/messages';
import { useGetAllDataQuery } from 'features/dataTable/dataTableApiSlice';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { selectUserPermissions } from 'features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';

type IDataTableAddActionProps = Omit<FabProps, 'onClick'>;

function DataTableAddAction(props: IDataTableAddActionProps): JSX.Element {
	const dispatch = useAppDispatch();
	const { maxRowsPerTable } = useAppSelector(selectUserPermissions);

	const { openSidebarWith } = useSidebarAction('home');

	const { data } = useGetAllDataQuery();
	const rowCount = data?.length ?? 0;

	const maxRowCountIsReached = rowCount >= maxRowsPerTable;

	const handleShowDialog = (content: Messages) => {
		dispatch(
			changeSmartDialogState({
				variant: 'payment',
				isOpen: true,
				content,
			})
		);
	};

	const handleOpenAddNewItemForm = () => {
		maxRowCountIsReached
			? handleShowDialog(Messages.MAX_COUNT_OF_ITEMS_IS_REACHED)
			: openSidebarWith('CreateDataItem');
	};

	return (
		<Tooltip title='Добавить СИ' placement='top'>
			<Fab {...props} onClick={handleOpenAddNewItemForm} id='adding'>
				<AddIcon />
			</Fab>
		</Tooltip>
	);
}

export default DataTableAddAction;
