import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { selectValidateDialog } from '../../dialogArshinSlice';
import { useArshinActions } from '../../hooks/useArshinActions';

import Dialog from 'components/Dialog';
import { useAppSelector } from 'hooks/redux';

function ValidateDialog() {
	const isOpen = useAppSelector(selectValidateDialog);
	const { handleCloseDialog, handleCancelSending, handleEditArshinItem } = useArshinActions();

	return (
		<Dialog
			open={isOpen}
			title='Не заполнены поля'
			content='Заполните недостающие поля у СИ или уберите их из списка'
			onClose={handleCloseDialog}
			action={
				<>
					<Stack direction='row' columnGap={1}>
						<Button sx={{ color: 'text.disabled' }} onClick={handleCloseDialog}>
							Закрыть
						</Button>
						<Button onClick={handleCancelSending}>Отправить валидные</Button>
						<Button onClick={handleEditArshinItem}>Редактировать</Button>
					</Stack>
				</>
			}
		/>
	);
}

export default ValidateDialog;
