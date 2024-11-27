import { Button, DialogActions, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { useArshinRequests } from '../../../hooks/useArshinRequests';

import { type IRequestItem } from 'types/arshinIntegration';

function DialogButtons() {
	const {
		formState: { errors, isValid },
	} = useFormContext<IRequestItem>();

	const { handleCloseDialog } = useArshinRequests();

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
				<Button onClick={handleCloseDialog}>Отменить</Button>
			</Stack>
		</DialogActions>
	);
}

export default DialogButtons;
