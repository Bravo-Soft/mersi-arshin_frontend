import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

function LayoutFooter(): JSX.Element {
	return (
		<Toolbar variant='dense' sx={{ justifyContent: 'center' }}>
			<Typography variant='caption' color='text.secondary'>
				© ООО «Браво Софт», 2022—{dayjs().year()}
			</Typography>
		</Toolbar>
	);
}

export default LayoutFooter;
