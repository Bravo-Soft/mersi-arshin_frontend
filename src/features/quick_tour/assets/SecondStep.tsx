import { Typography } from '@mui/material';

function SecondStep() {
	return (
		<>
			<Typography sx={{ fontSize: 15, fontWeight: 500, my: 1 }}>
				Для заполнения и выбора полей в карточке, используйте колесико «мышки». После заполнения
				всех необходимых полей, нажмите на кнопку “Сохранить" и карточка появится в общем
				списке.
			</Typography>
		</>
	);
}

export default SecondStep;
