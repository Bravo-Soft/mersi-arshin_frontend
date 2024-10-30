import CancelIcon from '@mui/icons-material/Cancel';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Box } from '@mui/material';

import StyledGridOverlay from './StyledGridOverlay';

import { Messages } from 'constant/messages';

type ErrorType = 'readError' | 'emptyFile';

interface IErrorOverlay {
	errorType: ErrorType;
}

function ErrorOverlay({ errorType }: IErrorOverlay): JSX.Element {
	switch (errorType) {
		case 'readError': {
			return (
				<StyledGridOverlay>
					<SearchOffIcon />
					<Box mt={1} color='text.secondary'>
						{Messages.FAILED_TO_READ_FILE}
					</Box>
				</StyledGridOverlay>
			);
		}
		case 'emptyFile': {
			return (
				<StyledGridOverlay>
					<InsertDriveFileIcon />
					<Box mt={1} color='text.secondary'>
						{Messages.FILE_IS_EMPTY}
					</Box>
				</StyledGridOverlay>
			);
		}

		default: {
			return (
				<StyledGridOverlay>
					<CancelIcon />
					<Box mt={1} color='text.secondary'>
						{Messages.SOMETHING_WRONG_ELSE}
					</Box>
				</StyledGridOverlay>
			);
		}
	}
}

export default ErrorOverlay;
