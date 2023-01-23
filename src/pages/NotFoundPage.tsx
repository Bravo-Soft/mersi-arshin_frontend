import { AppRoutes } from 'constant/appRoutes';
import { useAuth } from 'hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

import ArrowBack from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

function NotFoundPage(): JSX.Element {
	const navigate = useNavigate();
	const { state } = useLocation();

	const isAuth = useAuth();

	const route = isAuth ? AppRoutes.HOME : AppRoutes.AUTH;
	const buttonText = isAuth ? 'На главную' : 'На страницу авторизации';

	const handleGoToPreviouslyPage = () => {
		navigate(route, { state, replace: true });
	};

	return (
		<Container
			sx={{
				height: 1,
				display: 'flex',
				alignItems: 'stretch',
				justifyContent: 'center',
				flexDirection: 'column',
				rowGap: 3,
			}}
			component='main'
			maxWidth='xs'
		>
			<Box component='section'>
				<Typography textAlign='center' variant='h4' fontWeight={500} color='text.secondary'>
					Ошибка 404
				</Typography>
				<Typography textAlign='center' sx={{ mt: 1 }} variant='body2' color='text.disabled'>
					Указанная страница не найдена
				</Typography>
			</Box>
			<Divider />
			<Box mx='auto'>
				<Button onClick={handleGoToPreviouslyPage} startIcon={<ArrowBack />}>
					{buttonText}
				</Button>
			</Box>
		</Container>
	);
}

export default NotFoundPage;
