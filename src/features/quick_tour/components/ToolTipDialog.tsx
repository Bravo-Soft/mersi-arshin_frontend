import type { TooltipRenderProps } from 'react-joyride';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export interface IHelperDialogProps {
	config: any;
}

function TooltipDialog({
	step,
	continuous,
	closeProps,
	primaryProps,
	tooltipProps,
}: TooltipRenderProps) {
	return (
		<Box
			{...tooltipProps}
			sx={{ width: '390px', padding: '20px', backgroundColor: 'white', borderRadius: '15px' }}
		>
			{step.title && (
				<Typography variant='body1' sx={{ fontWeight: 800, fontSize: '18px', mb: 1 }}>
					{step.title}
				</Typography>
			)}
			<Typography
				variant='body1'
				sx={{ fontWeight: 500, fontSize: '15px', mb: 3, lineHeight: 1.3 }}
			>
				{step.content}
			</Typography>

			<Stack direction='column' flexGrow={1} alignItems='flex-start'>
				{/* {index > 0 && (
					<Button {...backProps} sx={{ fontSize: '12px', p: 0 }}>
						Закрыть подсказки
					</Button>
				)} */}

				{continuous && (
					<Button
						id='next'
						{...primaryProps}
						sx={{ fontSize: '14px', p: 0, fontWeight: 500, textTransform: 'inherit' }}
						size='small'
					>
						К следующей подсказке
					</Button>
				)}
				{continuous && (
					<Button
						id='close'
						{...closeProps}
						sx={{ fontSize: '10px', p: 0, color: 'black', fontWeight: 500 }}
					>
						Закрыть подсказки
					</Button>
				)}
			</Stack>
		</Box>
	);
}
export default TooltipDialog;
