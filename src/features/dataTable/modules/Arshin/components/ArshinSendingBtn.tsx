import GetAppIcon from '@mui/icons-material/GetApp';
import Button from '@mui/material/Button';
import { useGridApiContext } from '@mui/x-data-grid-pro';

import { selectUploadModelIds } from '../arshinTableSlice';
import { selectIsWorkingArshin } from '../eventSourceSlice';
import { useSendingArshin } from '../hooks/useSendingArshin';

import { useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';

function ArshinSendingBtn() {
	const apiRef = useGridApiContext();
	const { handleStart } = useSendingArshin();
	const isWorking = useAppSelector(selectIsWorkingArshin);

	const processData = useAppSelector(selectUploadModelIds);
	const { closeSidebar } = useSidebarAction('arshin');
	const handleSend = async () => {
		closeSidebar();
		await handleStart(processData);
		apiRef.current.setSelectionModel([]);
	};

	return (
		<Button disabled={!processData.length} startIcon={<GetAppIcon />} onClick={handleSend}>
			{isWorking ? 'Добавить сейчас' : 'Получить сейчас'}
		</Button>
	);
}

export default ArshinSendingBtn;
