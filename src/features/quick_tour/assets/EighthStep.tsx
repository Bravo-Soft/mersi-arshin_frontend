import { Typography } from '@mui/material';

function ThirdStep() {
	return (
		<>
			<Typography sx={{ fontSize: 15, fontWeight: 500, my: 2 }}>
				Для решения повседневных задач в системе реализовано ряд инструментов:
			</Typography>

			{stepContent.map(({ title, content }) => (
				<Typography>
					-
					<Typography component='span' sx={{ fontWeight: 600, fontSize: 14 }}>
						"{title}"
					</Typography>
					{content && (
						<Typography
							variant='body1'
							component='span'
							sx={{ fontSize: 15, fontWeight: 500 }}
						>
							- {content}
						</Typography>
					)}
				</Typography>
			))}
		</>
	);
}

export default ThirdStep;

const stepContent = [
	{
		title: 'Кнопка  СИ',
		subTitle: 'Создать график поверки',
		content:
			'при нажатии на эту кнопку выбираете диапазон нужых дат и фильтров графика и нажимаете “Выгрузить" в нужном формате.',
	},
	{
		title: 'Кнопка  СИ',
		subTitle: 'Создать график поверки',
		content:
			'при нажатии на эту кнопку выбираете диапазон нужых дат и фильтров графика и нажимаете “Выгрузить" в нужном формате.',
	},
	{
		title: 'Кнопка  СИ',
		subTitle: 'Создать график поверки',
		content:
			'при нажатии на эту кнопку выбираете диапазон нужых дат и фильтров графика и нажимаете “Выгрузить" в нужном формате.',
	},
	{
		title: 'Кнопка  СИ',
		subTitle: 'Создать график поверки',
		content:
			'при нажатии на эту кнопку выбираете диапазон нужых дат и фильтров графика и нажимаете “Выгрузить" в нужном формате.',
	},
	{
		title: 'Кнопка  СИ',
		subTitle: 'Создать график поверки',
		content:
			'при нажатии на эту кнопку выбираете диапазон нужых дат и фильтров графика и нажимаете “Выгрузить" в нужном формате.',
	},
	
];
