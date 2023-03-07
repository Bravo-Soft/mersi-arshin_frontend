import { Typography } from '@mui/material';

function ThirdStep() {
	return (
		<>
			<Typography sx={{ fontSize: 15, fontWeight: 500, my: 2 }}>
				При нажатии правой кнопки мыши, на выбранном СИ, открывается меню возможностей:
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
		title: 'Редактировать СИ',
		content: 'после нажатия на кнопку открывается карточка для редактирования ',
	},
	{
		title: 'Поверка СИ',
		content: 'позволяет сразу перейти к разделу “Поверка СИ" в карточке и внести изменения',
	},
	{
		title: 'Файлы',
		content: 'возможность открыть вложенные файлы или прикрепить новые',
	},
	{
		title: 'Добавить в избранное',
		content: 'позволяет формировать, выделять цветом и закреплять,избранные СИ',
	},
	{
		title: 'Удалить СИ',
	},
];
