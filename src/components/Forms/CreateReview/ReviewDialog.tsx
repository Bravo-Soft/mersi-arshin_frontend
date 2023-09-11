import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormProvider, useForm } from 'react-hook-form';


import ContentCreateReview from './ContentCreateReview';
import { reviewResolver } from './reviewResover';

import { usePostNewReviewMutation } from 'features/review/reviewApiSlice';
import { formTrimming } from 'utils/formTrimming';

interface ICreateReviewProps {
	isOpen: boolean;
	handleModalReview: () => void;
}

export interface IReview {
	rating: number;
	message: string;
}

function CreateReview({ isOpen, handleModalReview }: ICreateReviewProps) {
	const [postNewReview] = usePostNewReviewMutation();

	const methods = useForm<IReview>({
		defaultValues: {
			rating: 0,
			message: '',
		},
		resolver: reviewResolver,
	});

	const onSubmit = methods.handleSubmit(async data => {
		await postNewReview(formTrimming(data));
		methods.reset();
		handleModalReview();
	});

	return (
		<Dialog open={isOpen} onClose={handleModalReview}>
			<CloseIcon
				onClick={handleModalReview}
				sx={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
			/>
			<DialogTitle>Оставить отзыв</DialogTitle>
			<FormProvider {...methods}>
				<Box minWidth='360px' component={'form'} onSubmit={onSubmit}>
					<DialogContent>
						<ContentCreateReview />
					</DialogContent>
					<DialogActions sx={{ px: 3, pb: 3 }}>
						<Button type='submit' variant='contained' fullWidth>
							Отправить
						</Button>
					</DialogActions>
				</Box>
			</FormProvider>
		</Dialog>
	);
}

export default CreateReview;
