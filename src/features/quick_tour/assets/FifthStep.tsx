import { Typography } from '@mui/material';

function FifthStep() {
	return (
		<>
			<Typography sx={{ fontSize: 15, fontWeight: 500, mb: 2 }}>
				нажав на кнопку “Столбцы” в верхнем меню, в левом углу экрана откроется окно о с
				настройкой отображения столбцов в основной таблице.
			</Typography>
			<Typography sx={{ fontSize: 15, fontWeight: 500, mb: 2 }}>
				А для смены их очередности отображения достаточно в основной таблице захватить левой
				кнопкой мыши нужный столбец и перетянуть его на желаемое место.
			</Typography>
		</>
	);
}

export default FifthStep;
