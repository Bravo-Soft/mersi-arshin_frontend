import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

import { useArshinRequests } from '../hooks/useArshinRequests';

import { ArshinStatus } from 'constant/arshinStatus';

function ArshinSendingBtn() {
	const { handleCreateRequest, selectedDataItems } = useArshinRequests();

	const isReady = selectedDataItems?.some(({ status }) => status === ArshinStatus.DONE);

	return (
		<Button
			startIcon={<AddIcon />}
			disabled={!selectedDataItems.length || isReady}
			onClick={handleCreateRequest}
		>
			Создать запрос
		</Button>
	);
}

export default ArshinSendingBtn;
