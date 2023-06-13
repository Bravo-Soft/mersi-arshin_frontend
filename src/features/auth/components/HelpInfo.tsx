
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { maxLength, minLength } from '../validationRules';

const rulesList = [
	`Минимальная длина ${minLength} символов`,
	`Максимальная длина ${maxLength} символов`,
	'Только латинский алфавит',
	'Хотя бы одна строчная буква',
	'Хотя бы одна заглавная буква',
	'Хотя бы одна цифра',
	'Хотя бы один спец символ, к ним относятся , . ; : ! ?  - _ ( )',
];

function HelpInfo(): JSX.Element {
	return (
		<>
			<Typography color='text.secondary'>
				Для входа введите адрес почты, на который зарегистрирован аккаунт и ваш пароль. Пароль
				должен соответствовать правилам безопасности:
			</Typography>
			<List>
				{rulesList.map((rule, i) => (
					<ListItem
						key={rule}
						sx={{ color: 'text.secondary', py: 0.5 }}
						disableGutters
						disablePadding
					>
						<ListItemAvatar sx={{ minWidth: 48 }}>
							<Avatar
								sx={{
									width: 24,
									height: 24,
									fontSize: 14,
									bgcolor: 'background.default',
									color: 'text.secondary',
								}}
							>
								{i + 1}
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={rule} />
					</ListItem>
				))}
			</List>
		</>
	);
}

export default HelpInfo;
