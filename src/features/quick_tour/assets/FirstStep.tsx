import { Typography } from '@mui/material';

function FirstStep() {
	return (
		<Typography sx={{ fontSize: 15, fontWeight: 500, my: 2 }}>
			При нажатие на «плюсик» в правом нижнем углу, у Вас откроется поле для создания новой
			карточки СИ.
		</Typography>
	);
}

export default FirstStep;
