import { Button, DialogActions, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { useRequestDialog } from '../hooks/useRequestDialog';

function DialogButtons() {
	const {
		formState: { errors, isValid },
	} = useFormContext<any>();

	const { handleClose } = useRequestDialog();

	const isDisabled = !isValid;

	return (
		<DialogActions
			sx={{
				justifyContent: errors.fieldsDate ? 'space-between' : 'flex-end',
				padding: '8px 25px',
			}}
		>
			<Stack flexDirection='row' gap={1}>
				<Button type='submit' disabled={isDisabled}>
					Сохранить и отправить
				</Button>
				<Button onClick={handleClose}>Отменить</Button>
			</Stack>
		</DialogActions>
	);
}

export default DialogButtons;
