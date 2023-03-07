import { Typography } from '@mui/material';

function SeventhStep() {
	return (
		<>
			<Typography sx={{ fontSize: 15, fontWeight: 500, my: 2 }}>
				вы можете подобрать по разным диапазонам значений нужные средства измерений.
			</Typography>
			<Typography sx={{ fontSize: 15, fontWeight: 500, my: 2 }}>
				Если необходимо указать разные диапазоны подборок вы можете добавить еще поле фильтров
				нажав на кнопку
				<Typography component={'span'} sx={{ fontWeight: 600 }}>
					“Добавить фильтры"
				</Typography>
			</Typography>
		</>
	);
}

export default SeventhStep;
