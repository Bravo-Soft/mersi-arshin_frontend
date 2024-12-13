import { Button, DialogActions, Skeleton, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { useArshinRequests } from '../../../hooks/useArshinRequests';

import { type IRequestItem } from 'types/arshinIntegration';

function DialogButtons() {
	const {
		formState: { errors, isValid },
	} = useFormContext<IRequestItem>();

	const { handleCloseDialog, isCreating } = useArshinRequests();

	const isDisabled = !isValid;

	return (
		<DialogActions
			sx={{
				justifyContent: isValid ? 'space-between' : 'flex-end',
				padding: '8px 25px',
			}}
		>
			<Stack flexDirection='row' gap={1}>
				{isCreating ? (
					<Skeleton variant='text' />
				) : (
					<Button type='submit' disabled={isDisabled}>
						Сохранить и отправить
					</Button>
				)}
				<Button onClick={handleCloseDialog}>Отменить</Button>
			</Stack>
		</DialogActions>
	);
}

export default DialogButtons;
