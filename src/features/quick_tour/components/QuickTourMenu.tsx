import { Button, Stack, Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
import { quickTourMenuConfig } from '../quickTourMenuConfig';
import { startTourHandler, stepHandler } from './quickTourSlice';
import { useAppDispatch } from 'hooks/redux';

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
		<Popover
			open={Boolean(anchorTourEl)}
			anchorEl={anchorTourEl}
			onClose={handleCloseTour}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			PaperProps={{ sx: { p: 2, minWidth: 300, m: '0 auto' } }}
		>
			<Typography variant='h6'>Вы можете выбрать подсказку в системе</Typography>
			<Stack sx={{ my: 2 }}>
				{quickTourMenuConfig.map(({ title, step }, index) => (
					<Typography
						key={index}
						onClick={handleStartTour(step)}
						sx={{
							fontSize: 14,
							fontWeight: 500,
							cursor: 'pointer',
							':hover': {
								opacity: '0.5',
							},
						}}
					>
						{index + 1}. {title}
					</Typography>
				))}
			</Stack>
			<Stack direction='column' flexGrow={1} alignItems='flex-start'>
				<Button
					sx={{ fontSize: '14px', p: 0, fontWeight: 500, textTransform: 'inherit' }}
					size='small'
					onClick={handleStartTour(0)}
				>
					Просмотреть все подсказки
				</Button>

				<Button
					onClick={() => handleCloseTour()}
					sx={{ fontSize: '10px', p: 0, color: 'black', fontWeight: 500 }}
				>
					Закрыть подсказки
				</Button>
			</Stack>
		</Popover>
	);
}

export default QuickTourMenu;
