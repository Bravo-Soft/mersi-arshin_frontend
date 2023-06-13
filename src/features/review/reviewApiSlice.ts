import { enqueueSnackbar } from 'notistack';

import { API } from 'app/api';
import { apiSlice } from 'app/apiSlice';
import { Messages } from 'constant/messages';

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
			onQueryStarted: async (_arg, { queryFulfilled }) => {
				try {
					await queryFulfilled;
					enqueueSnackbar(Messages.REVIEW_SUCCESSFULLY_SENDED, { variant: 'success' });
				} catch {
					enqueueSnackbar(Messages.FAILED_TO_SEND_REVIEW, { variant: 'error' });
				}
			},
		}),
	}),
});

export const { usePostNewReviewMutation } = reviewApiSlice;
