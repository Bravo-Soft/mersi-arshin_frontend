import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

import { selectUploadModelIds } from '../arshinTableSlice';
import { useArshinActions } from '../hooks/useArshinActions';
import { useArshinRequests } from '../hooks/useArshinRequests';

import { useAppSelector } from 'hooks/redux';

function ArshinSendingBtn() {
	// const apiRef = useGridApiContext();
	// const { handleStart } = useSendingArshin();
	// const isWorking = useAppSelector(selectIsWorkingArshin);

	const { handleCreateRequest } = useArshinRequests();

	const processData = useAppSelector(selectUploadModelIds);
	// const { closeSidebar } = useSidebarAction('arshin');
	// const { handleOpenCreateRequestModal } = useArshinActions();
	// const handleSend = async () => {
	// 	closeSidebar();
	// 	await handleStart(processData);
	// 	apiRef.current.setSelectionModel([]);
	// };

	return (
		// <Button disabled={!processData.length} startIcon={<GetAppIcon />} onClick={handleSend}>
		// 	{isWorking ? 'Добавить сейчас' : 'Получить сейчас'}
		// </Button>
		<Button startIcon={<AddIcon />} disabled={!processData.length} onClick={handleCreateRequest}>
			Создать запрос
		</Button>
	);
}

export default ArshinSendingBtn;
