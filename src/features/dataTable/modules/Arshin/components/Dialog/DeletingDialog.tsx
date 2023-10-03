import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { selectDeletingDialog } from '../../dialogArshinSlice';
import { useArshinActions } from '../../hooks/useArshinActions';
import useTableActions from '../../hooks/useTableActions';

import Dialog from 'components/Dialog';
import { useAppSelector } from 'hooks/redux';

function DeletingDialog(): JSX.Element {
	const { isOpen } = useAppSelector(selectDeletingDialog);
	const { selectionIds } = useTableActions();

	const { handleDeleteItems, handleCloseDialog } = useArshinActions();

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
					<Button onClick={handleCloseDialog}>Отмена</Button>
					<Button onClick={handleDeleteItems}>Удалить</Button>
				</Stack>
			}
			onClose={handleCloseDialog}
		/>
	);
}

export default DeletingDialog;
