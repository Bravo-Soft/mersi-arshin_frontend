import { Typography } from '@mui/material';

function SeventhStep() {
	return (
		<>
			<Typography sx={{ fontSize: 15, fontWeight: 500, my: 1 }}>
				вы можете подобрать по разным диапазонам значений нужные средства измерений.
			</Typography>
			<Typography sx={{ fontSize: 15, fontWeight: 500, my: 1 }}>
				Если необходимо указать разные диапазоны подборок вы можете добавить еще поле фильтров
				нажав на кнопку
				<Typography component={'span'} sx={{ fontWeight: 600 }}>
					<span>&#32;</span>“Добавить фильтры"
				</Typography>
			</Typography>
		</>
	);
}

export default SeventhStep;
