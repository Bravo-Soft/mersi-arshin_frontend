import LockIcon from '@mui/icons-material/Lock';
import ToggleButton from '@mui/material/ToggleButton';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppRoutes } from 'constant/appRoutes';
import { Messages } from 'constant/messages';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { useGetUserDataQuery } from 'features/user/userApiSlice';
import { selectUserPermissions } from 'features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import StyledToggleButton from 'styled/StyledToggleButton';
import StyledToggleButtonGroup from 'styled/StyledToggleButtonGroup';

function ButtonsNavigation() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();

	const [item, setItem] = useState(pathname);

	const { isArshin } = useAppSelector(selectUserPermissions);
	const { isLoading } = useGetUserDataQuery();

	const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
		if (!isArshin && newAlignment === AppRoutes.ARSHIN) {
			return dispatch(
				changeSmartDialogState({
					variant: 'payment',
					isOpen: true,
					content: Messages.MODULE_IS_NOT_PAID,
				})
			);
		}
		setItem(newAlignment);
		navigate(newAlignment);
	};

	return (
		<StyledToggleButtonGroup
			color='primary'
			size='small'
			exclusive
			value={item}
			onChange={handleChange}
		>
			<ToggleButton value={AppRoutes.HOME}>Средства Измерения</ToggleButton>
			<StyledToggleButton moduleIsActive={isArshin || isLoading} value={AppRoutes.ARSHIN}>
				Контроль поверки в госреестре
				{!isArshin && !isLoading && <LockIcon sx={{ ml: 1 }} />}
			</StyledToggleButton>
		</StyledToggleButtonGroup>
	);
}

export default ButtonsNavigation;
