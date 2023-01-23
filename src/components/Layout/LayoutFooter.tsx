import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function LayoutFooter(): JSX.Element {
	return (
		<Toolbar variant='dense' sx={{ justifyContent: 'center' }}>
			<Typography variant='caption' color='text.secondary'>
				© ООО «Браво Софт», 2022
			</Typography>
		</Toolbar>
	);
}

export default LayoutFooter;
