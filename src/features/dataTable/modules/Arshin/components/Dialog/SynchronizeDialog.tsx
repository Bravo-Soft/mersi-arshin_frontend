import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { selectSelectedItemsDone, selectSelectedModelArshin } from '../../arshinTableSlice';
import { selectSynchronizeDialog } from '../../dialogArshinSlice';
import { useArshinActions } from '../../hooks/useArshinActions';

import Dialog from 'components/Dialog';
import { useAppSelector } from 'hooks/redux';

function SynchronizeDialog() {
	const { isOpen } = useAppSelector(selectSynchronizeDialog);
	const selectedItemsDone = useAppSelector(selectSelectedItemsDone);

	const selectedFullModelArshin = useAppSelector(selectSelectedModelArshin);

	const { handleSynchronizeItems, handleCloseDialog } = useArshinActions();

	const content = `Будут обновлены только строки, по которым получены данные с ФГИС “Аршин”, ${selectedItemsDone.length} из ${selectedFullModelArshin.length}`;

	return (
		<Dialog
			title='Внимание'
			content={content}
			open={isOpen}
			action={
				<Stack direction='row' columnGap={1}>
					<Button onClick={handleCloseDialog}>Отмена</Button>
					<Button onClick={handleSynchronizeItems}>Обновить</Button>
				</Stack>
			}
			onClose={handleCloseDialog}
		/>
	);
}

export default SynchronizeDialog;
