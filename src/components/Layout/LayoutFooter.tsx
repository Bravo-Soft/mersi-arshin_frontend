import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { getYear } from 'date-fns';

function LayoutFooter(): JSX.Element {
	return (
		<Toolbar variant='dense' sx={{ justifyContent: 'center' }}>
			<Typography variant='caption' color='text.secondary'>
				© ООО «Браво Софт», 2022 – {getYear(new Date())}
			</Typography>
		</Toolbar>
	);
}

export default LayoutFooter;
