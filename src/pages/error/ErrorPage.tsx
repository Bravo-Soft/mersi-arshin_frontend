import { ArrowBack } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';

export default function ErrorPage() {
	const error = useRouteError();
	const navigate = useNavigate();

	if (!isRouteErrorResponse(error)) {
		return null;
	}

	const handleNavigateToBack = () => {
		navigate(-1);
	};

	return (
		<Container
			sx={{
				height: 1,
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				rowGap: 3,
			}}
			component='main'
			maxWidth='xs'
		>
			<Stack component='section'>
				<Typography textAlign='center' variant='h4' fontWeight={500} color='text.secondary'>
					{error.status} | {error.statusText}
				</Typography>
				<Typography textAlign='center' sx={{ mt: 1 }} variant='body2' color='text.disabled'>
					Указанная страница не найдена
				</Typography>
			</Stack>
			<Divider />
			<Button startIcon={<ArrowBack />} onClick={handleNavigateToBack}>
				Вернуться назад
			</Button>
		</Container>
	);
}
