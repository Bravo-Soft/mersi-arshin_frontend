import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { IAuthFormRequest } from '../authApiSlice';
import { authResolver } from '../authResolver';
import AuthPaper from '../styled/AuthPaper';

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
	const theme = useTheme();

	const onSubmit = handleSubmit(submitCallback);

	const handleTogglePasswordVisibility = () => {
		setPasswordIsVisible(prev => !prev);
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
					InputProps={{
						endAdornment: (
							<InputAdornment
								position='start'
								onClick={handleTogglePasswordVisibility}
								sx={{
									cursor: 'pointer',
									'& .MuiSvgIcon-root': {
										color: errors.password ? theme.palette.error.main : 'inherit',
									},
								}}
							>
								{passwordIsVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
