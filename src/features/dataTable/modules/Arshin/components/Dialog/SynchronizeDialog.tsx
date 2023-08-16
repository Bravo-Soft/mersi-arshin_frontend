import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { resetDialogState, selectSynchronizeDialog } from '../../dialogArshinSlice';
import useTableActions from '../../hooks/useTableActions';

import Dialog from 'components/Dialog';
import { ArshinStatus } from 'constant/arshinStatus';
import { isValueDefined } from 'guards/isValueDefined';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

function SynchronizeDialog() {
	const dispatch = useAppDispatch();
	const { content, isOpen } = useAppSelector(selectSynchronizeDialog);
	const { selectionItems } = useTableActions();

	const handleCloseSynchronizeDialog = () => {
		dispatch(resetDialogState());
	};

	const handleSynchronizeData = () => {
		if (isValueDefined(selectionItems)) {
			const selectedIdsDone = selectionItems
				.filter(el => el.status === ArshinStatus.DONE)
				.map(el => el.id);
			console.log('id на бэк', selectedIdsDone);
		}
		handleCloseSynchronizeDialog();
	};

	return (
		<Dialog
			title='Внимание'
			content={content}
			open={isOpen}
			action={
				<Stack direction='row' columnGap={1}>
					<Button onClick={handleCloseSynchronizeDialog}>Отмена</Button>
					<Button onClick={handleSynchronizeData}>Синхронизировать</Button>
				</Stack>
			}
			onClose={handleCloseSynchronizeDialog}
		/>
	);
}

export default SynchronizeDialog;
