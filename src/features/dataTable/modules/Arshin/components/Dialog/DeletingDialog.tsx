import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { selectDeleteModelIds } from '../../arshinTableSlice';
import { selectDeletingDialog } from '../../dialogArshinSlice';
import { useArshinActions } from '../../hooks/useArshinActions';

import Dialog from 'components/Dialog';
import { useAppSelector } from 'hooks/redux';

function DeletingDialog(): JSX.Element {
	const isOpen = useAppSelector(selectDeletingDialog);
	const deleteItems = useAppSelector(selectDeleteModelIds);

	const { handleDeleteItems, handleCloseDialog } = useArshinActions();

	const contentDialog = `При удалении ${
		deleteItems.length > 1 ? 'данных строк' : 'данной строки'
	} будут потеряны все данные, полученные из ФГИС “Аршин”`;

	return (
		<Dialog
			title='Внимание'
			content={contentDialog}
			open={isOpen}
			action={
				<Stack direction='row' columnGap={1}>
					<Button onClick={handleCloseDialog}>Отмена</Button>
					<Button onClick={handleDeleteItems}>Удалить</Button>
				</Stack>
			}
			onClose={handleCloseDialog}
		/>
	);
}

export default DeletingDialog;
