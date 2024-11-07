import Dialog from '@mui/material/Dialog';

import CreateRequestForm from './CreateRequestForm';
import { useRequestDialog } from './hooks/useRequestDialog';

function CreateRequestModal(): JSX.Element {
	const { open, handleClose } = useRequestDialog();

	return (
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
			<CreateRequestForm />
		</Dialog>
	);
}

export default CreateRequestModal;
