import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';
import { Messages } from 'constant/messages';
import { showNotification } from 'features/notificator/notificatorSlice';

interface IPostReviewRequestArgs {
	rating: number;
	message: string;
}

const reviewApiSlice = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: builder => ({
		postNewReview: builder.mutation<void, IPostReviewRequestArgs>({
			query: review => ({
				url: API.user.reviews,
				method: 'POST',
				body: review,
			}),
			onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
				try {
					await queryFulfilled;
					dispatch(
						showNotification({
							message: Messages.REVIEW_SUCCESSFULY_SENDED,
							type: 'success',
						})
					);
				} catch {
					dispatch(
						showNotification({
							message: Messages.FAILED_TO_SEND_REVIEW,
							type: 'error',
						})
					);
				}
			},
		}),
	}),
});

export const { usePostNewReviewMutation } = reviewApiSlice;
