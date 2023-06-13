import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

import Rating from './Rating';
import type { IReview } from './ReviewDialog';

function ContentCreateReview() {
	const {
		control,
		register,
		formState: { errors },
	} = useFormContext<IReview>();

	return (
		<>
			<Controller name={'rating'} control={control} render={() => <Rating />} />
			<TextField
				sx={{ pb: 3 }}
				variant='filled'
				multiline
				error={Boolean(errors.message?.message)}
				helperText={errors.message?.message}
				placeholder='Введите сообщение отзыва'
				minRows={5}
				maxRows={5}
				style={{ width: '100%' }}
				{...register('message', { required: 'Поле обязательное к заполнению' })}
			/>
		</>
	);
}

export default ContentCreateReview;
