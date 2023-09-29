import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { resetDialogState, selectDeletingDialog } from '../../dialogArshinSlice';
import { useArshinActions } from '../../hooks/useArshinActions';
import useTableActions from '../../hooks/useTableActions';

import Dialog from 'components/Dialog';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

function DeletingDialog(): JSX.Element {
	const dispatch = useAppDispatch();
	const { isOpen } = useAppSelector(selectDeletingDialog);
	const { selectionIds } = useTableActions();

	const { handleDeleteItems } = useArshinActions();

	const handleCloseDeletingDialog = () => {
		dispatch(resetDialogState());
	};

	const handleDeleteSelectedDataItem = async () => {
		await handleDeleteItems();
		handleCloseDeletingDialog();
	};

	const contentDialog = `При удалении ${
		selectionIds.length > 1 ? 'данных строк' : 'данной строки'
	} будут потеряны все данные, полученные из ФГИС “Аршин”`;

	return (
		<Dialog
			title='Внимание'
			content={contentDialog}
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
