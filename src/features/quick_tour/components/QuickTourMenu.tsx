import { quickTourMenuConfig } from '../quickTourMenuConfig';
import { startTourHandler, stepHandler } from './quickTourSlice';
import { useAppDispatch } from 'hooks/redux';

import {
	Avatar,
	Dialog,
	DialogTitle,
	List,
	ListItemButton,
	ListItemAvatar,
	ListItemText,
	Stack,
	Button,
} from '@mui/material';

interface IQuickTourMenuProps {
	anchorTourEl: HTMLElement | null;
	handleCloseTour: () => void;
}

function QuickTourMenu({ anchorTourEl, handleCloseTour }: IQuickTourMenuProps) {
	const dispatch = useAppDispatch();

	const handleStartTour = (step: number) => async (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		dispatch(startTourHandler(true));
		dispatch(stepHandler(step));
		handleCloseTour();
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
