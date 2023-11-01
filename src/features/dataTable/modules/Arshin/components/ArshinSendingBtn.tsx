import GetAppIcon from '@mui/icons-material/GetApp';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { selectUploadModelIds } from '../arshinTableSlice';
import { selectIsStartArshin, selectProgressArshin } from '../eventSourceSlice';
import { useSendingArshin } from '../hooks/useSendingArshin';

import CircularCloseProgress from './CircularCloseProgress';

import { useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';

function ArshinSendingBtn() {
	const { handleCancel, handleStart } = useSendingArshin();
	const isStart = useAppSelector(selectIsStartArshin);
	const progressArshin = useAppSelector(selectProgressArshin);

	const processData = useAppSelector(selectUploadModelIds);
	const { closeSidebar } = useSidebarAction('arshin');

	const handleSend = async () => {
		closeSidebar();
		await handleStart(processData);
	};

	return (
		<>
			{isStart ? (
				<Stack flexDirection='row' alignItems='center' gap={1}>
					<CircularCloseProgress progress={progressArshin} />
					<Button onClick={handleCancel}>Отмена</Button>
				</Stack>
			) : (
				<Button disabled={!processData.length} startIcon={<GetAppIcon />} onClick={handleSend}>
					Получить сейчас
				</Button>
			)}
		</>
	);
}

export default ArshinSendingBtn;
