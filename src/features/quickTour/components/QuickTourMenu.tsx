import { useAppDispatch } from 'hooks/redux';
import { quickTourMenuConfig } from '../quickTourMenuConfig';
import { startTourHandler, stepHandler, menuStartTour } from './quickTourSlice';

import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';

interface IQuickTourMenuProps {
	anchorTourEl: HTMLElement | null;
	handleCloseTour: () => void;
}

function QuickTourMenu({ anchorTourEl, handleCloseTour }: IQuickTourMenuProps) {
	const dispatch = useAppDispatch();

	const handleStartTour = (step: number) => async (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		dispatch(stepHandler(step));
		dispatch(menuStartTour(true));
		handleCloseTour();
		setTimeout(() => {
			dispatch(startTourHandler(true));
		}, 600);
	};

	return (
		<Dialog
			onClose={handleCloseTour}
			open={Boolean(anchorTourEl)}
			PaperProps={{ sx: { width: '600px', py: 2 } }}
		>
			<DialogTitle>Выберите пункт меню</DialogTitle>
			<List>
				{quickTourMenuConfig.map(({ title, step }, index) => (
					<ListItemButton sx={{ px: 3 }} key={title} onClick={handleStartTour(step)}>
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
						<ListItemText primary={title} />
					</ListItemButton>
				))}
			</List>
			<Stack
				direction='row'
				flexGrow={1}
				justifyContent='space-between'
				sx={{ px: '27px', mt: 2 }}
			>
				<Button size='small' onClick={handleStartTour(0)}>
					Просмотреть все подсказки
				</Button>
				<Button onClick={() => handleCloseTour()} color='inherit'>
					Закрыть подсказки
				</Button>
			</Stack>
		</Dialog>
	);
}

export default QuickTourMenu;
