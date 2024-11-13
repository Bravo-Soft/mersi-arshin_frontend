import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

import { selectUploadModelIds, setCreateRequestModal } from '../arshinTableSlice';

import { useAppDispatch, useAppSelector } from 'hooks/redux';

function ArshinSendingBtn() {
	// const apiRef = useGridApiContext();
	// const { handleStart } = useSendingArshin();
	// const isWorking = useAppSelector(selectIsWorkingArshin);

	const processData = useAppSelector(selectUploadModelIds);
	// const { closeSidebar } = useSidebarAction('arshin');

	const dispatch = useAppDispatch();
	// const handleSend = async () => {
	// 	closeSidebar();
	// 	await handleStart(processData);
	// 	apiRef.current.setSelectionModel([]);
	// };

	const handleOpenCreateRequestModal = async () => {
		dispatch(setCreateRequestModal(true));
	};

	return (
		// <Button disabled={!processData.length} startIcon={<GetAppIcon />} onClick={handleSend}>
		// 	{isWorking ? 'Добавить сейчас' : 'Получить сейчас'}
		// </Button>
		<Button
			startIcon={<AddIcon />}
			disabled={!processData.length}
			onClick={handleOpenCreateRequestModal}
		>
			Создать запрос
		</Button>
	);
}

export default ArshinSendingBtn;
