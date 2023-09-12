import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

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
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IAuthFormRequest>({
		resolver: authResolver,
		defaultValues: {
			email: '',
			password: '',
		},
	});

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
				<Controller
					control={control}
					name='email'
					render={({ field }) => (
						<TextField
							{...field}
							label='Почта'
							error={Boolean(errors.email)}
							helperText={errors.email?.message}
							value={field?.value?.replace(/\s/g, '')}
							InputProps={{
								endAdornment: (
									<InputAdornment position='start'>
										<EmailIcon color={errors.email ? 'error' : 'inherit'} />
									</InputAdornment>
								),
							}}
						/>
					)}
				/>

				<Controller
					control={control}
					name='password'
					render={({ field }) => (
						<TextField
							{...field}
							label='Пароль'
							error={Boolean(errors.password)}
							helperText={errors.password?.message}
							value={field?.value?.replace(/\s/g, '')}
							type={passwordIsVisible ? 'text' : 'password'}
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
					)}
				/>
			</Stack>
			<Button variant='contained' fullWidth disabled={isLoading} type='submit'>
				Войти
			</Button>
		</AuthPaper>
	);
}

export default AuthForm;
