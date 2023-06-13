import { Messages } from 'constant/messages';
import {
	useDeletePhotoMutation,
	useGetPhotoQuery,
	useUpdatePhotoMutation,
} from 'features/photo/photoApiSlice';
import { useUpdateUserProfileMutation } from './userApiSlice';

import { enqueueSnackbar } from 'notistack';
import type { IProfile } from 'types/profile';

export const useSubmitProfileActions = (file: File | null, isDirty: boolean) => {
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
			enqueueSnackbar(Messages.USER_PROFILE_SUCCESSFULLY_UPDATED, { variant: 'success' });
		} catch {
			enqueueSnackbar(Messages.FAILED_TO_UPDATE_PROFILE, { variant: 'error' });
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
