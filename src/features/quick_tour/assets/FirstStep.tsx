import StyledTourDescription from '../styled/StyledTourDescription';

function FirstStep() {
	return (
		<>
			<StyledTourDescription marginBottom={1}>
				Нажмите на кнопку для создания нового СИ в системе. После нажатия откроется карточка, в
				которую Вы можете внести все данные о средстве измерения.
			</StyledTourDescription>
			<StyledTourDescription>
				При нажатие на «плюс» в правом нижнем углу, у Вас откроется поле для создания новой
				карточки СИ.
			</StyledTourDescription>
		</>
	);
}

export default FirstStep;
