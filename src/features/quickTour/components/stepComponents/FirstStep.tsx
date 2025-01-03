import StyledTourDescription from 'features/quickTour/styled/StyledTourDescription';

function FirstStep() {
	return (
		<>
			<StyledTourDescription marginBottom={1}>
				Нажмите на кнопку для создания нового СИ в системе. После нажатия откроется карточка, в
				которую Вы можете внести данные о средстве измерения.
			</StyledTourDescription>
			<StyledTourDescription>
				При нажатии на «плюс» в правом нижнем углу у Вас откроется поле для создания новой
				карточки СИ.
			</StyledTourDescription>
		</>
	);
}

export default FirstStep;
