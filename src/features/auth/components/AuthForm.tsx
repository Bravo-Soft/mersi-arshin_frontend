import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ClipboardEvent, KeyboardEvent, useState } from 'react';
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
		setValue,

		formState: { errors },
	} = useForm<IAuthFormRequest>({
		resolver: authResolver,
	});

	const onSubmit = handleSubmit(submitCallback);

	const handleTogglePasswordVisibility = () => {
		setPasswordIsVisible(prev => !prev);
	};

	const handleKeyDownSpace = (event: KeyboardEvent<HTMLDivElement>) =>
		event.code === 'Space' && event.preventDefault();

	const handlePasteEmail = (event: ClipboardEvent<HTMLDivElement>) => {
		event.preventDefault();
		const pasteEmail = event.clipboardData.getData('text').trim();
		setValue('email', pasteEmail);
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
					onPaste={handlePasteEmail}
					InputProps={{
						endAdornment: (
							<InputAdornment position='start'>
								<EmailIcon color={errors.email ? 'error' : 'inherit'} />
							</InputAdornment>
						),
					}}
				/>

				{/*<Controller*/}
				{/*	control={control}*/}
				{/*	name={'email'}*/}
				{/*	render={({ field }) => (*/}
				{/*		<TextField*/}
				{/*			{...field}*/}
				{/*			label='Почта'*/}
				{/*			value={field.value}*/}
				{/*			onChange={e => field.onChange(e.target.value.trim())}*/}
				{/*			error={Boolean(errors.email)}*/}
				{/*			helperText={errors.email?.message}*/}
				{/*			inputProps={{ onPaste: e => e.clipboardData.getData('').trim() }}*/}
				{/*			InputProps={{*/}
				{/*				endAdornment: (*/}
				{/*					<InputAdornment position='start'>*/}
				{/*						<EmailIcon color={errors.email ? 'error' : 'inherit'} />*/}
				{/*					</InputAdornment>*/}
				{/*				),*/}
				{/*			}}*/}
				{/*		/>*/}

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
