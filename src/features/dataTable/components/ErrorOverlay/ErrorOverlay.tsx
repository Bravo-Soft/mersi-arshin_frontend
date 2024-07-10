import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Box } from '@mui/material';

import StyledGridOverlay from './StyledGridOverlay';

import { Messages } from 'constant/messages';

function ErrorOverlay(): JSX.Element {
	return (
		<StyledGridOverlay>
			<SearchOffIcon />
			<Box mt={1} color='text.secondary'>
				{Messages.FAILED_TO_READ_FILE}
			</Box>
		</StyledGridOverlay>
	);
}

export default ErrorOverlay;
