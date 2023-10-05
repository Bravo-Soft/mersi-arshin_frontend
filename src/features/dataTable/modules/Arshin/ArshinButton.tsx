import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { ArshinIcon } from './ArshinIcon';

import { AppRoutes } from 'constant/appRoutes';
import { Messages } from 'constant/messages';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { useAppDispatch } from 'hooks/redux';

function ArshinButton() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	// const { isArshin } = useAppSelector(selectUserPermissions);

	const isArshin = true;

	const arshinNavigateAction = () => {
		navigate(AppRoutes.ARSHIN);
		localStorage.removeItem('Arshin-filter');
	};

	const handleRouteToArshin = () => {
		isArshin
			? arshinNavigateAction()
			: dispatch(
					changeSmartDialogState({
						variant: 'payment',
						isOpen: true,
						content: Messages.MODULE_IS_NOT_PAID,
					})
			  );
	};

	return (
		<Button
			sx={{ textTransform: 'uppercase' }}
			onClick={handleRouteToArshin}
			disabled={!isArshin}
			startIcon={<ArshinIcon />}
			disableRipple
		>
			Проверка в Госреестре
		</Button>
	);
}

export default ArshinButton;
