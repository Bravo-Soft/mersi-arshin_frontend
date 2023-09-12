import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { GridRowId } from '@mui/x-data-grid';

import { changeSmartDialogState, selectDeletingVariant } from './smartDialogSlice';

import Dialog from 'components/Dialog';
import { useDeleteDataItemMutation } from 'features/dataTable/dataTableApiSlice';
import { selectSelectedDataItem, selectSelectionModel } from 'features/dataTable/dataTableSlice';
import { selectSidebarStateOfHomePage } from 'features/sidebar/sidebarSlice';
import { isFormSelector } from 'guards/isFormSelector';
import { isValueDefined } from 'guards/isValueDefined';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';

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
	const selectionModel = useAppSelector(selectSelectionModel);

	const handleDeleteSelectedDataItem = async () => {
		const deleteArrayFiltered = Array.from(
			new Set([...selectionModel, selectedDataItem?.id])
		).filter(e => isValueDefined<GridRowId>(e)) as GridRowId[];

		if (isValueDefined(selectedDataItem)) {
			try {
				handleCloseDeletingDialog();
				await deleteDataItem(deleteArrayFiltered).unwrap();
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
