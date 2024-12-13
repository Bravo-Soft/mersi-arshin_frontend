import HistoryIcon from '@mui/icons-material/History';
import { Tooltip } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import StyledLayoutHistoryButton from './styled/StyledLayoutHistoryButton ';

import { AppRoutes } from 'constant/appRoutes';
import { setSelectedId } from 'features/historyTable/historyTableSlice';
import { useAppDispatch } from 'hooks/redux';
import { useAuth } from 'hooks/useAuth';

function LayoutButtonHistory() {
	const isAuth = useAuth();
	const navigate = useNavigate();
	const dispatch = useAppDispatch(); //Заменить логику сброса id
	const { pathname } = useLocation();

	if (!isAuth) {
		return null;
	}

	const handleClick = () => {
		dispatch(setSelectedId(''));
		navigate(AppRoutes.HISTORY);
	};

	return (
		<Tooltip title='Посмотреть историю изменения СИ'>
			<StyledLayoutHistoryButton
				pathname={pathname}
				size={pathname === AppRoutes.HISTORY ? 'large' : 'small'}
				startIcon={<HistoryIcon fontSize='large' />}
				onClick={handleClick}
			>
				История реестра
			</StyledLayoutHistoryButton>
		</Tooltip>
	);
}

export default LayoutButtonHistory;
