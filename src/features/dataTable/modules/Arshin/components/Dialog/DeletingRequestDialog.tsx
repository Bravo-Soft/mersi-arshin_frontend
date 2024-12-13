import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { selectDeletingRequestDialog } from '../../dialogArshinSlice';
import { useArshinRequests } from '../../hooks/useArshinRequests';

import Dialog from 'components/Dialog';
import { Messages } from 'constant/messages';
import { useAppSelector } from 'hooks/redux';

function DeletingRequestDialog(): JSX.Element {
	const isDeletingRequestDialogOpen = useAppSelector(selectDeletingRequestDialog);
	const { handleDeleteRequestItem, handleCloseDialog } = useArshinRequests();

	return (
		<Dialog
			title='Внимание'
			content={Messages.DELETE_REQUEST}
			open={isDeletingRequestDialogOpen}
			action={
				<Stack direction='row' columnGap={1}>
					<Button onClick={handleCloseDialog}>Отмена</Button>
					<Button onClick={handleDeleteRequestItem}>Удалить</Button>
				</Stack>
			}
			onClose={handleCloseDialog}
		/>
	);
}

export default DeletingRequestDialog;
