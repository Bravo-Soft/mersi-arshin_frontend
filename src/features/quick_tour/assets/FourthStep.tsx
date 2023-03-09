import { Typography } from '@mui/material';

function FourthStep() {
	return (
		<>
			<Typography sx={{ fontSize: 15, fontWeight: 500, my: 1 }}>
				При нажатии на стрелку в левом верхнем углу, откроется меню “Быстрой подборки":
			</Typography>

			{stepContent.map(({ title, content }) => (
				<Typography>
					<Typography component='span' sx={{ fontWeight: 600, fontSize: 14 }}>
						"{title}"
					</Typography>
					<span>&#32;&#8212;&#32;</span>
					{content && (
						<Typography
							variant='body1'
							component='span'
							sx={{ fontSize: 15, fontWeight: 500 }}
						>
							{content}
						</Typography>
					)}
				</Typography>
			))}
		</>
	);
}

export default FourthStep;

const stepContent = [
	{
		title: 'Избранное',
		content: 'доступ к избранным СИ ',
	},
	{
		title: 'Просроченные',
		content: 'подборка СИ которых просрочены даты выполнения работ',
	},
	{
		title: 'Месяц',
		content: 'подборка СИ по датам выполнения работ в выбранном месяце',
	},
	{
		title: 'Поиск',
		content: 'интеллектуальный поиск по всем полям',
	},
];
