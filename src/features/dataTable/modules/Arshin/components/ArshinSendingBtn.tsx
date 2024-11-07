import GetAppIcon from '@mui/icons-material/GetApp';
import Button from '@mui/material/Button';
import { useGridApiContext } from '@mui/x-data-grid-pro';

import { selectUploadModelIds, setCreateRequestModal } from '../arshinTableSlice';
import { selectIsWorkingArshin } from '../eventSourceSlice';
import { useSendingArshin } from '../hooks/useSendingArshin';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';

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
			startIcon={<GetAppIcon />}
			disabled={!processData.length}
			onClick={handleOpenCreateRequestModal}
		>
			Создать запрос
		</Button>
	);
}

export default ArshinSendingBtn;
