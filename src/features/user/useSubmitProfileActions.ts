import { Messages } from 'constant/messages';
import { showNotification } from 'features/notificator/notificatorSlice';
import {
	useDeletePhotoMutation,
	useGetPhotoQuery,
	useUpdatePhotoMutation,
} from 'features/photo/photoApiSlice';
import { useAppDispatch } from 'hooks/redux';
import { useUpdateUserProfileMutation } from './userApiSlice';

import type { IProfile } from 'types/profile';

export const useSubmitProfileActions = (file: File | null, isDirty: boolean) => {
	const dispatch = useAppDispatch();

	const [updateUserProfile, { isLoading: isUserProfileLoading }] = useUpdateUserProfileMutation();
	const [updatePhoto] = useUpdatePhotoMutation();
	const [resetPhoto] = useDeletePhotoMutation();
	const { isFetching: isGetPhotoFetching, isLoading: isGetPhotoLoading } = useGetPhotoQuery();

	const submitPhoto = async (file: File) => {
		const data = new FormData();
		data.append('file', file);

		await updatePhoto(data);
	};

	const submitProfile = async (data: IProfile) => {
		try {
			await updateUserProfile(data).unwrap();
			dispatch(
				showNotification({
					message: Messages.USER_PROFILE_SUCCESSFULY_UPDATED,
					type: 'success',
				})
			);
		} catch {
			dispatch(
				showNotification({
					message: Messages.FAILED_TO_UPDATE_PROFILE,
					type: 'error',
				})
			);
		}
	};

	const submitAllForm = async (data: IProfile) => {
		if (isDirty) await submitProfile(data);
		if (file) await submitPhoto(file);
	};

	const handleDeletePhoto = async () => {
		await resetPhoto();
	};

	return {
		submitAllForm,
		handleDeletePhoto,
		status: {
			isUserProfileLoading,
			isPhotoLoading: isGetPhotoFetching || isGetPhotoLoading,
		},
	};
};
