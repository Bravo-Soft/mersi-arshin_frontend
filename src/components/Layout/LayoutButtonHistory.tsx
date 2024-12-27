import HistoryIcon from '@mui/icons-material/History';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import StyledLayoutHistoryButton from './styled/StyledLayoutHistoryButton ';

import { AppRoutes } from 'constant/appRoutes';
import { setSelectedId } from 'features/historyTable/historyTableSlice';
import { useAppDispatch } from 'hooks/redux';
import { useAuth } from 'hooks/useAuth';

function LayoutButtonHistory() {
	const isAuth = useAuth();
	const [active, setActive] = useState(false);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();

	useEffect(() => {
		if (pathname !== AppRoutes.HISTORY) {
			setActive(false);
		}
	}, [pathname]);

	const handleClick = () => {
		if (active) {
			setActive(false);
			navigate(AppRoutes.HOME);
		} else {
			setActive(true);
			dispatch(setSelectedId(''));
			navigate(AppRoutes.HISTORY);
		}
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
