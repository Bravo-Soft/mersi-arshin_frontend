import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { selectSelectedItemsDone, selectSelectedModelArshin } from '../../arshinTableSlice';
import { resetDialogState, selectSynchronizeDialog } from '../../dialogArshinSlice';
import { useArshinActions } from '../../hooks/useArshinActions';

import Dialog from 'components/Dialog';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

function SynchronizeDialog() {
	const dispatch = useAppDispatch();
	const { isOpen } = useAppSelector(selectSynchronizeDialog);
	const selectedItemsDone = useAppSelector(selectSelectedItemsDone);

	const selectedFullModelArshin = useAppSelector(selectSelectedModelArshin);

	const { handleSynchronizeItems } = useArshinActions();

	const handleCloseSynchronizeDialog = () => {
		dispatch(resetDialogState());
	};

	const content = `Будут обновлены только строки, по которым получены данные с ФГИС “Аршин”, ${selectedItemsDone.length} из ${selectedFullModelArshin.length}`;

	const handleSynchronizeData = () => {
		handleSynchronizeItems();
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
					<Button onClick={handleSynchronizeData}>Обновить</Button>
				</Stack>
			}
			onClose={handleCloseSynchronizeDialog}
		/>
	);
}

export default SynchronizeDialog;
