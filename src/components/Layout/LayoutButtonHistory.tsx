import HistoryIcon from '@mui/icons-material/History';
import { Button, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from 'constant/appRoutes';
import { setSelectedId } from 'features/historyTable/historyTableSlice';
import { useAppDispatch } from 'hooks/redux';
import { useAuth } from 'hooks/useAuth';

function LayoutButtonHistory() {
	const isAuth = useAuth();
	const navigate = useNavigate();
	const dispatch = useAppDispatch(); //Заменить логику сброса id

	if (!isAuth) {
		return null;
	}

	const handleClick = () => {
		dispatch(setSelectedId(''));
		navigate(AppRoutes.HISTORY);
	};

	return (
		<Tooltip title='Посмотреть историю изменения СИ'>
			<Button
				size='small'
				startIcon={<HistoryIcon fontSize='large' />}
				sx={{ color: '#ffffff' }}
				onClick={handleClick}
			>
				История
			</Button>
		</Tooltip>
	);
}

export default LayoutButtonHistory;
