import { useAppDispatch } from 'hooks/redux';
import { useGetPhotoQuery } from 'features/photo/photoApiSlice';
import { forwardRef, useEffect, useState } from 'react';
import { preparePhotoUrl } from 'utils/preparePhotoUrl';

import type { ChangeEvent } from 'react';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import useNotification from 'hooks/useNotification';

interface IUserPhotoProps {
	file: File | null;
	setFile: React.Dispatch<React.SetStateAction<File | null>>;
	onClickLoadButton: () => void;
}

const UserPhoto = forwardRef<HTMLInputElement, IUserPhotoProps>((props, ref): JSX.Element => {
	const { file, setFile, onClickLoadButton } = props;
	const dispatch = useAppDispatch();

	const showNotification = useNotification(dispatch);

	const { data, isFetching } = useGetPhotoQuery();
	const [preview, setPreview] = useState<string>();

	const photoUrl = preparePhotoUrl(data);

	useEffect(() => {
		if (!file) {
			setPreview(undefined);
			return;
		}

		const url = URL.createObjectURL(file);
		setPreview(url);

		return () => {
			URL.revokeObjectURL(url);
		};
	}, [file]);

	const handleChangePhoto = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.currentTarget.files) {
			const selectedFile = event.currentTarget.files[0];
			setFile(selectedFile);
			showNotification('PRESS_BUTTON_FOR_SAVING', 'info');
		}
	};

	return (
		<Badge
			anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			overlap='circular'
			badgeContent={
				<>
					<IconButton
						onClick={onClickLoadButton}
						size='large'
						sx={{
							bgcolor: 'grey.100',
							':is(:hover, :focus)': {
								bgcolor: 'grey.200',
							},
						}}
					>
						<PhotoCameraIcon />
					</IconButton>
					<input
						ref={ref}
						hidden
						onChange={handleChangePhoto}
						type='file'
						accept='image/png,image/jpeg'
					/>
				</>
			}
		>
			{isFetching ? (
				<Skeleton variant='circular' sx={{ width: 200, height: 200 }} />
			) : (
				<Avatar sx={{ width: 200, height: 200 }} src={preview ?? photoUrl} />
			)}
		</Badge>
	);
});

export default UserPhoto;
