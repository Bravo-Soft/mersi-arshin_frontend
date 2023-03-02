import { Stack, Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
import { quickTourMenuConfig } from '../quickTourMenuConfig';

interface IQuickTourMenuProps {
	anchorTourEl: HTMLElement | null;
	handleCloseTour: () => void;
}

function QuickTourMenu({ anchorTourEl, handleCloseTour }: IQuickTourMenuProps) {
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
			<Stack>
				{quickTourMenuConfig.map(({ title }, index) => (
					<Typography
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
		</Popover>
	);
}

export default QuickTourMenu;
