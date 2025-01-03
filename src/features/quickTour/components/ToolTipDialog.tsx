
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { TooltipRenderProps } from 'react-joyride';

import { selectUserRoles } from 'features/user/userSlice';
import { useAppSelector } from 'hooks/redux';

//кастомный компонент диалога тура

function TooltipDialog({
	step,
	continuous,
	closeProps,
	primaryProps,
	tooltipProps,
	index,
	isLastStep,
}: TooltipRenderProps) {
	const { isReader } = useAppSelector(selectUserRoles);
	return (
		<Box
			{...tooltipProps}
			sx={{ width: '410px', padding: '20px', backgroundColor: 'white', borderRadius: '15px' }}
		>
			{step.title && (
				<Typography variant='body1' sx={{ fontWeight: 800, fontSize: '18px', mb: 1 }}>
					{step.title}
				</Typography>
			)}
			<Stack sx={{ maxHeight: 350, overflow: 'auto', paddingRight: 1 }}>
				{step.content && step.content}
			</Stack>
			{isReader && index < 3 && (
				<Typography variant='body1' sx={{ color: '#9e9696', fontSize: '13px', my: 2 }}>
					Ряд возможностей системы могут быть ограничены у Вашей учетной записи.
				</Typography>
			)}
			<Stack direction='column' flexGrow={1} alignItems='flex-start' mt={2}>
				{!isLastStep && (
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
						{isLastStep ? 'Закончить обучение' : 'Закрыть подсказки'}
					</Button>
				)}
			</Stack>
		</Box>
	);
}
export default TooltipDialog;
