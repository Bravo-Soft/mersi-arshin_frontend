import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { enqueueSnackbar } from 'notistack';
import { KeyboardEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { IAuthFormRequest } from '../authApiSlice';
import { authResolver } from '../authResolver';
import AuthPaper from '../styled/AuthPaper';

import { Messages } from 'constant/messages';

interface IAuthFormProps {
	submitCallback: (data: IAuthFormRequest) => void;
	isLoading: boolean;
	isError: boolean;
}

function AuthForm({ submitCallback, isLoading, isError }: IAuthFormProps): JSX.Element {
	const [passwordIsVisible, setPasswordIsVisible] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IAuthFormRequest>({
		resolver: authResolver,
	});

	const onSubmit = handleSubmit(submitCallback);

	const handleTogglePasswordVisibility = () => {
		setPasswordIsVisible(prev => !prev);
	};

	const handleKeyDownSpace = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.code === 'Space') {
			event.preventDefault();
			enqueueSnackbar(Messages.SPACE_CLICK, { preventDuplicate: true });
		}
	};

	return (
		<AuthPaper onSubmit={onSubmit} isError={isError}>
			<Typography textAlign='center' color='text.secondary' variant='h6'>
				Авторизация
			</Typography>
			<Stack gap={3}>
				<TextField
					{...register('email')}
					label='Почта'
					error={Boolean(errors.email)}
					helperText={errors.email?.message}
					InputProps={{
						endAdornment: (
							<InputAdornment position='start'>
								<EmailIcon color={errors.email ? 'error' : 'inherit'} />
							</InputAdornment>
						),
					}}
				/>
				<TextField
					{...register('password')}
					label='Пароль'
					type={passwordIsVisible ? 'text' : 'password'}
					error={Boolean(errors.password)}
					helperText={errors.password?.message}
					onKeyDown={handleKeyDownSpace}
					InputProps={{
						endAdornment: (
							<InputAdornment
								position='start'
								onClick={handleTogglePasswordVisibility}
								sx={{
									cursor: 'pointer',
								}}
							>
								{passwordIsVisible ? (
									<VisibilityIcon color={errors.password ? 'error' : 'inherit'} />
								) : (
									<VisibilityOffIcon color={errors.password ? 'error' : 'inherit'} />
								)}
							</InputAdornment>
						),
					}}
				/>
			</Stack>
			<Button variant='contained' fullWidth disabled={isLoading} type='submit'>
				Войти
			</Button>
		</AuthPaper>
	);
}

export default AuthForm;
