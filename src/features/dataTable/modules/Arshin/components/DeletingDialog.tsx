import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { selectSelectedDataIds } from '../arshinTableSlice';
import { resetDialogState, selectDeletingDialog } from '../dialogArshinSlice';

import Dialog from 'components/Dialog';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

function DeletingDialog(): JSX.Element {
	const dispatch = useAppDispatch();
	const { content, isOpen } = useAppSelector(selectDeletingDialog);
	const selectionIds = useAppSelector(selectSelectedDataIds);

	const handleCloseDeletingDialog = () => {
		dispatch(resetDialogState());
	};

	const handleDeleteSelectedDataItem = () => {
		if (selectionIds.length) {
			console.log(selectionIds);
			handleCloseDeletingDialog();
		} else {
			handleCloseDeletingDialog();
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
