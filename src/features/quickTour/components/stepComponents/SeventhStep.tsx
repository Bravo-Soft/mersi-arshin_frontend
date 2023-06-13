import StyledTourDescription from 'features/quickTour/styled/StyledTourDescription';
import StyledTourTitle from 'features/quickTour/styled/StyledTourTitle';

function SeventhStep() {
	return (
		<>
			<StyledTourDescription>
				Здесь необходимо выбрать разные диапазоны для подборки нужных СИ, по необходимости Вы
				можете добавить еще поле фильтров, нажав на кнопку
				<StyledTourTitle>
					<span>&#32;</span>“Добавить фильтры"
				</StyledTourTitle>
			</StyledTourDescription>
		</>
	);
}

export default SeventhStep;
