import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { selectModelSynchronizeIds, selectSelectedArshin } from '../../arshinTableSlice';
import { selectSynchronizeDialog } from '../../dialogArshinSlice';
import { useArshinActions } from '../../hooks/useArshinActions';

import Dialog from 'components/Dialog';
import { useAppSelector } from 'hooks/redux';

function SynchronizeDialog() {
	const isOpen = useAppSelector(selectSynchronizeDialog);

	const dataIsDone = useAppSelector(selectModelSynchronizeIds);

	const modelData = useAppSelector(selectSelectedArshin);

	const { handleModelSynchronize, handleCloseDialog } = useArshinActions();

	const content = `Будут обновлены только строки, по которым получены данные с ФГИС “Аршин”, ${dataIsDone.length} из ${modelData.length}`;

	return (
		<Dialog
			title='Внимание'
			content={content}
			open={isOpen}
			action={
				<Stack direction='row' columnGap={1}>
					<Button onClick={handleCloseDialog}>Отмена</Button>
					<Button onClick={handleModelSynchronize}>Обновить</Button>
				</Stack>
			}
			onClose={handleCloseDialog}
		/>
	);
}

export default SynchronizeDialog;
