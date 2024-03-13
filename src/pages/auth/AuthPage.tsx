import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from 'constant/appRoutes';
import type { IAuthFormRequest } from 'features/auth/authApiSlice';
import { useLoginMutation } from 'features/auth/authApiSlice';
import AuthForm from 'features/auth/components/AuthForm';
import ErrorTip from 'features/auth/components/ErrorTip';
import HelpDialog from 'features/auth/components/HelpDialog';
import { useErrorMessage } from 'features/auth/hooks/useErrorMessage';

function AuthPage(): JSX.Element {
	/* Метод авторизации */
	const [login, { error, isError, isLoading, reset }] = useLoginMutation();
	/* Ошибка и метод для навигации */
	const errorMessage = useErrorMessage(error);
	const navigate = useNavigate();

	/* Обработчики */
	const handleLogin = async (data: IAuthFormRequest) => {
		await login(data).unwrap();
		navigate(AppRoutes.HOME, { replace: true });
	};

	const handleResetError = () => {
		reset();
	};

	return (
		<Box height='100vh' position='relative'>
			<Container
				maxWidth='xs'
				sx={{
					height: 1,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					rowGap: 2,
				}}
			>
				<AuthForm submitCallback={handleLogin} isLoading={isLoading} isError={isError} />
				<ErrorTip isError={isError} message={errorMessage} onResetError={handleResetError} />
			</Container>
			<HelpDialog />
		</Box>
	);
}

export default AuthPage;
