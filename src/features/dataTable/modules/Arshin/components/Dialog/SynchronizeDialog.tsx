import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { enqueueSnackbar } from 'notistack';

import { useSynchronizeItemsMutation } from '../../arshinTableApiSlice';
import { resetDialogState, selectSynchronizeDialog } from '../../dialogArshinSlice';
import useTableActions from '../../hooks/useTableActions';

import Dialog from 'components/Dialog';
import { ArshinStatus } from 'constant/arshinStatus';
import { Messages } from 'constant/messages';
import { isValueDefined } from 'guards/isValueDefined';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

function SynchronizeDialog() {
	const dispatch = useAppDispatch();
	const { content, isOpen } = useAppSelector(selectSynchronizeDialog);

	const [synchronizeItemsArshin] = useSynchronizeItemsMutation();

	const { selectionItems } = useTableActions();

	const handleCloseSynchronizeDialog = () => {
		dispatch(resetDialogState());
	};

	const handleSynchronizeData = async () => {
		if (isValueDefined(selectionItems)) {
			const selectedIdsDone = selectionItems
				.filter(el => el.status === ArshinStatus.DONE)
				.map(el => el.id);

			try {
				await synchronizeItemsArshin(selectedIdsDone);
				enqueueSnackbar(Messages.ARSHIN_ITEM_SUCCESSFULLY_UPDATED, {
					variant: 'success',
				});
			} catch {
				enqueueSnackbar(Messages.FAILED_ARSHIN_ITEM_UPDATED, {
					variant: 'error',
				});
			} finally {
				handleCloseSynchronizeDialog();
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
					<Button onClick={handleCloseSynchronizeDialog}>Отмена</Button>
					<Button onClick={handleSynchronizeData}>Обновить</Button>
				</Stack>
			}
			onClose={handleCloseSynchronizeDialog}
		/>
	);
}

export default SynchronizeDialog;
