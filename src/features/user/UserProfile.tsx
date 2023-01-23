import { selectUserProfileIsOpen } from 'features/sidebar/sidebarSlice';
import { useAppSelector } from 'hooks/redux';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetUserProfileQuery } from './userApiSlice';
import { useSubmitProfileActions } from './useSubmitProfileActions';

import type { IProfile } from 'types/profile';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormContainer from 'styled/FormContainer';
import UserPhoto from './UserPhoto';

interface IProfileInput {
	key: keyof Omit<IProfile, 'userId'>;
	label: string;
}

const inputs: IProfileInput[] = [
	{ key: 'firstName', label: 'Имя' },
	{ key: 'lastName', label: 'Фамилия' },
	{ key: 'patronymicName', label: 'Отчество' },
	{ key: 'organization', label: 'Компания' },
	{ key: 'division', label: 'Отдел' },
	{ key: 'position', label: 'Должность' },
	{ key: 'phone', label: 'Телефон' },
	{ key: 'email', label: 'Почта (логин)' },
];

function UserProfile(): JSX.Element {
	const [file, setFile] = useState<File | null>(null);
	const uploadRef = useRef<HTMLInputElement>(null);

	const isUserProfileOpen = useAppSelector(selectUserProfileIsOpen);

	const { data: userData } = useGetUserProfileQuery();
	const {
		handleSubmit,
		register,
		setValue,
		formState: { isDirty },
	} = useForm<IProfile>({ defaultValues: userData });
	const { submitAllForm, handleDeletePhoto, status } = useSubmitProfileActions(file, isDirty);

	const onSubmit = handleSubmit(async data => {
		await submitAllForm(data);
		setFile(null);
	});

	const handleClickUploadButton = () => {
		uploadRef.current?.click();
	};

	useEffect(() => {
		if (userData) {
			const keys = Object.keys(userData) as Array<keyof IProfile>;
			keys.forEach(key => setValue(key, userData[key]));
		}
	}, [setValue, userData]);

	// Так как компонент остается вмонтированным, мы должны сбрасывать фото при закрытии сайдбара
	useEffect(() => {
		if (!isUserProfileOpen && file) {
			setFile(null);
		}
	}, [file, setFile, isUserProfileOpen]);

	return (
		<FormContainer onSubmit={onSubmit}>
			<Box
				display='flex'
				justifyContent='center'
				flexDirection='column'
				alignItems='center'
				px={3.5}
				pb={3.5}
				rowGap={2}
				flexGrow={1}
			>
				<UserPhoto
					ref={uploadRef}
					file={file}
					setFile={setFile}
					onClickLoadButton={handleClickUploadButton}
				/>
				<Stack width={1} rowGap={1}>
					{inputs.map(({ key, label }) =>
						status.isUserProfileLoading ? (
							<Skeleton variant='text' sx={{ width: 1, height: 48 }} />
						) : (
							<TextField
								{...register(key)}
								key={key}
								fullWidth
								variant='standard'
								disabled={key === 'email'}
								InputProps={{ disableUnderline: true }}
								InputLabelProps={{ shrink: true }}
								label={label}
							/>
						)
					)}
				</Stack>
			</Box>
			<Stack direction='row' px={3.5} pb={2} columnGap={2}>
				<Button fullWidth onClick={handleDeletePhoto}>
					Сброс фото
				</Button>
				<Button
					fullWidth
					variant='contained'
					type='submit'
					disabled={!isDirty && !Boolean(file)}
				>
					Сохранить
				</Button>
			</Stack>
		</FormContainer>
	);
}

export default UserProfile;
