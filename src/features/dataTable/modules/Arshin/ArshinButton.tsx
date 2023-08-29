import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

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
		>
			<Typography variant='h6' textOverflow='ellipsis' noWrap>
				Контроль поверки в Госреестре
			</Typography>
		</Button>
	);
}

export default ArshinButton;
