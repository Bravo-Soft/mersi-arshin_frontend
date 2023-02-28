import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export interface IHelperDialogProps {
	config: any;
}
interface iPageTourModal {
	continuous: boolean; // If the tour is continuous or not
	index: number; // The current step's index
	isLastStep: boolean; // The name says it all
	size: number; // The number of steps in the tour
	step: any; // The current step data
	backProps: any; // The back button's props
	closeProps: any; // The close button's props
	primaryProps: any; // The primary button's props (Close or Next if the tour is continuous)
	skipProps: any; // The skip button's props
	tooltipProps: any; // The root element props (including ref)
}

function HelperDialog({
	continuous,
	index,
	step,
	backProps,
	closeProps,
	primaryProps,
	tooltipProps,
}: iPageTourModal) {
	<Paper {...tooltipProps}>
		{step.title && (
			<Typography variant='body1' sx={{ fontWeight: 800, fontSize: '16px', mb: 1 }}>
				{step.title}
			</Typography>
		)}
		<Typography
			variant='body1'
			sx={{ fontWeight: 500, fontSize: '16px', mb: 1.5, lineHeight: 1.2 }}
		>
			{step.content}
		</Typography>

		<Stack direction='column-reverse' flexGrow={1} alignItems='flex-start'>
			{/* {index > 0 && (
				<Button {...backProps}>
					<FormattedMessage id='back' />
				</Button>
			)} */}
			{continuous && (
				<Button
					id='next'
					sx={{ fontSize: '12px', p: 0 }}
					size='small'
					endIcon={<NavigateNextIcon />}
				>
					К следующей подсказке
				</Button>
			)}
			{!continuous && (
				<Button {...closeProps} sx={{ fontSize: '12px', p: 0 }} id='close'>
					Закрыть подсказки
				</Button>
			)}
		</Stack>
	</Paper>;
}
export default HelperDialog;
