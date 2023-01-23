import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from 'components/Dialog';

import { useDeleteDataItemMutation } from 'features/dataTable/dataTableApiSlice';
import { selectSelectedDataItem } from 'features/dataTable/dataTableSlice';
import { selectSidebarStateOfHomePage } from 'features/sidebar/sidebarSlice';
import { isValueDefined } from 'guards/isValueDefined';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';
import { isFormSelector } from 'guards/isFormSelector';
import { changeSmartDialogState, selectDeletingVariant } from './smartDialogSlice';

function DeletingDialog(): JSX.Element {
	const dispatch = useAppDispatch();
	const { content, isOpen } = useAppSelector(selectDeletingVariant);
	const selectedDataItem = useAppSelector(selectSelectedDataItem);
	const { selector } = useAppSelector(selectSidebarStateOfHomePage);

	const [deleteDataItem] = useDeleteDataItemMutation();
	const { closeSidebar } = useSidebarAction('home');

	const handleCloseDeletingDialog = () => {
		dispatch(changeSmartDialogState({ variant: 'deleting', isOpen: false }));
	};

	const handleDeleteSelectedDataItem = async () => {
		if (isValueDefined(selectedDataItem)) {
			try {
				handleCloseDeletingDialog();
				await deleteDataItem(selectedDataItem.id).unwrap();
			} finally {
				handleCloseDeletingDialog();
				isFormSelector(selector) && closeSidebar();
			}
		}
	};

	return (
		<Dialog
			title='Внимание'
			content={content}
			open={isOpen}
			action={
				<Stack direction='row' columnGap={1}>
					<Button onClick={handleCloseDeletingDialog}>Отмена</Button>
					<Button onClick={handleDeleteSelectedDataItem}>Удалить</Button>
				</Stack>
			}
			onClose={handleCloseDeletingDialog}
		/>
	);
}

export default DeletingDialog;
