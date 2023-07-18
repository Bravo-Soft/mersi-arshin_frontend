import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { quickTourMenuConfig } from '../quickTourMenuConfig';

import { menuStartTour, startTourHandler, stepHandler } from './quickTourSlice';

import { useAppDispatch } from 'hooks/redux';

interface IQuickTourMenuProps {
	anchorTourEl: HTMLElement | null;
	handleCloseTour: () => void;
}

/*
Компонент меню с выбором шага тура 

при клике на пункт меню передается индекс и переключается флаг запуска из меню  ,после таймаута запускается сам тур ( необходимо для появления компонентов (контекстное меню и тд))


*/

function QuickTourMenu({ anchorTourEl, handleCloseTour }: IQuickTourMenuProps) {
	const dispatch = useAppDispatch();
	// const menuCoinfig = useStepMenuByRole(quickTourMenuConfig);

	const handleStartTour = (step: number) => async (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		dispatch(stepHandler(step));
		dispatch(menuStartTour(true));
		handleCloseTour();
		setTimeout(() => {
			dispatch(startTourHandler(true));
		}, 700);
	};

	return (
		<Dialog
			onClose={handleCloseTour}
			open={Boolean(anchorTourEl)}
			PaperProps={{ sx: { width: '600px' } }}
		>
			<DialogTitle>Выберите пункт меню</DialogTitle>
			<List dense>
				{quickTourMenuConfig.map(({ title, step }, index) => (
					<ListItemButton
						disableGutters
						sx={{ pl: 3, minHeight: 40 }}
						key={title}
						onClick={handleStartTour(step)}
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
								{index + 1}
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={title}
							primaryTypographyProps={{ color: 'text.secondary', fontSize: 16 }}
						/>
					</ListItemButton>
				))}
			</List>
			<DialogActions>
				<Button size='small' onClick={handleStartTour(0)}>
					Просмотреть все подсказки
				</Button>
				<Button onClick={handleCloseTour}>Закрыть подсказки</Button>
			</DialogActions>
		</Dialog>
	);
}

export default QuickTourMenu;
