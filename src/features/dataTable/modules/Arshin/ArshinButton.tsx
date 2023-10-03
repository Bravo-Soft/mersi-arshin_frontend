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
			sx={{ p: 0, textTransform: 'none' }}
			onClick={handleRouteToArshin}
			disabled={!isArshin}
			startIcon={<ArshinIcon />}
		>
			<Typography variant='body1' textOverflow='ellipsis' noWrap>
				Проверка в Госреестре
			</Typography>
		</Button>
	);
}

export default ArshinButton;
