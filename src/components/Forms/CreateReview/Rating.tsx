import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import WrappStarIcon from './styled/WrappStarIcon';
import cn from 'classnames';

import type { IReview } from './ReviewDialog';

const arr = [...Array(5)];

function Rating() {
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	const { setValue } = useFormContext<IReview>();

	const handleClickRating = (idx: number) => () => {
		setRating(idx);
		setValue('rating', idx);
	};

	const handleMouseEnterRating = (idx: number) => () => {
		setHover(idx);
	};

	const handleMouseLeaveRating = () => {
		setHover(rating);
	};

	return (
		<Box
			display='flex'
			justifyContent='space-around'
			pb={4}
			onMouseLeave={handleMouseLeaveRating}
		>
			{arr.map((_, index) => {
				index = index + 1;
				return (
					<IconButton
						sx={{
							':hover': {
								bgcolor: 'transparent',
							},
						}}
						key={index}
						onMouseEnter={handleMouseEnterRating(index)}
						onClick={handleClickRating(index)}
					>
						<WrappStarIcon
							className={cn({
								active: index <= (hover || rating),
								default: index > (hover || rating),
							})}
						/>
					</IconButton>
				);
			})}
		</Box>
	);
}

export default Rating;
