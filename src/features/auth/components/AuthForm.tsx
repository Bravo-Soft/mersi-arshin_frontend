import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AuthPaper from '../styled/AuthPaper';

import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import type { IAuthFormRequest } from '../authApiSlice';

import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { validationRules } from '../validationRules';

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
	} = useForm<IAuthFormRequest>({});
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
					{...register('email', validationRules.email)}
					label='Почта'
					error={Boolean(errors.email)}
					helperText={errors.email?.message}
					InputProps={{
						endAdornment: (
							<InputAdornment position='start'>
								<EmailIcon color={Boolean(errors.email) ? 'error' : 'inherit'} />
							</InputAdornment>
						),
					}}
				/>
				<TextField
					{...register('password', validationRules.password)}
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
										color: Boolean(errors.password)
											? theme.palette.error.main
											: 'inherit',
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
