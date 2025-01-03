import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import { enqueueSnackbar } from 'notistack';
import type { ChangeEvent } from 'react';
import { forwardRef, useEffect, useState } from 'react';

import { Messages } from 'constant/messages';
import { useGetPhotoQuery } from 'features/photo/photoApiSlice';
import { preparePhotoUrl } from 'utils/preparePhotoUrl';

interface IUserPhotoProps {
	file: File | null;
	setFile: React.Dispatch<React.SetStateAction<File | null>>;
	onClickLoadButton: () => void;
	onResetCallback: () => void;
}

const UserPhoto = forwardRef<HTMLInputElement, IUserPhotoProps>((props, ref): JSX.Element => {
	const { file, setFile, onClickLoadButton, onResetCallback } = props;

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
		if (event.currentTarget.files && event.currentTarget.files[0].size >= 2097152) {
			enqueueSnackbar(Messages.FAILED_TO_UPLOAD_PHOTO_SIZE, { variant: 'error' });
			onResetCallback();
			return;
		}
		if (event.currentTarget.files) {
			const selectedFile = event.currentTarget.files[0];
			setFile(selectedFile);
			enqueueSnackbar(Messages.PRESS_BUTTON_FOR_SAVING, { variant: 'info' });
		}
	};

	return (
		<Badge
			anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			overlap='circular'
			badgeContent={
				<>
					<Tooltip title='Максимальный размер фото 2мб'>
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
					</Tooltip>
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
