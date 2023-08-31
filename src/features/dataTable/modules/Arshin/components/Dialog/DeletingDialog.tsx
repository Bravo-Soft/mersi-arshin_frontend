import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { enqueueSnackbar } from 'notistack';

import { useDeleteItemsMutation } from '../../arshinTableApiSlice';
import { selectSelectedDataIds } from '../../arshinTableSlice';
import { resetDialogState, selectDeletingDialog } from '../../dialogArshinSlice';

import Dialog from 'components/Dialog';
import { Messages } from 'constant/messages';
import { isValueDefined } from 'guards/isValueDefined';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

function DeletingDialog(): JSX.Element {
	const dispatch = useAppDispatch();
	const { content, isOpen } = useAppSelector(selectDeletingDialog);
	const selectionIds = useAppSelector(selectSelectedDataIds);

	const [deleteFromArshin] = useDeleteItemsMutation();

	const handleCloseDeletingDialog = () => {
		dispatch(resetDialogState());
	};

	const handleDeleteSelectedDataItem = () => {
		if (isValueDefined(selectionIds)) {
			try {
				deleteFromArshin(selectionIds).unwrap();
				enqueueSnackbar(Messages.ITEM_SUCCESSFULLY_DELETED, { variant: 'success' });
			} catch {
				enqueueSnackbar(Messages.FAILED_DELETE_ITEM, { variant: 'error' });
			} finally {
				handleCloseDeletingDialog();
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
