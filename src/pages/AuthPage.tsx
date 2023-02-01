import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AuthForm from 'features/auth/components/AuthForm';
import ErrorTip from 'features/auth/components/ErrorTip';
import HelpDialog from 'features/auth/components/HelpDialog';

import type { IAuthFormRequest } from 'features/auth/authApiSlice';

import { AppRoutes } from 'constant/appRoutes';
import { useLoginMutation } from 'features/auth/authApiSlice';
import { useErrorMessage } from 'features/auth/hooks/useErrorMessage';
import { useNavigate } from 'react-router-dom';
import LayoutFooter from 'components/Layout/LayoutFooter';

// import LayoutFooter from './LayoutFooter';

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
		<Box
			display='flex'
			height='100vh'
			minHeight='100vh'
			position='relative'
			flexDirection='column'
		>
			<Container
				maxWidth='xs'
				sx={{
					height: 1,
					rowGap: 2,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
				}}
			>
				<AuthForm submitCallback={handleLogin} isLoading={isLoading} isError={isError} />
				<ErrorTip isError={isError} message={errorMessage} onResetError={handleResetError} />
			</Container>
			<LayoutFooter />
			<HelpDialog />
		</Box>
	);
}

export default AuthPage;
